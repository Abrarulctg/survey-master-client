import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { FaPen, FaTrash } from 'react-icons/fa6';
import { FcViewDetails } from "react-icons/fc";
import Swal from 'sweetalert2';
import useSurveyor from '../../../../hooks/useSurveyor';
import useSurveys from '../../../../hooks/useSurveys';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

const SurveysBySurveyor = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: surveysBySurveyor = [], refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/surveyor/surveys/${user?.email}`);
            return res.data;
        }
    });

    console.log(surveysBySurveyor)

    const handleDeleteSurvey = async (id) => {
        const res = await axiosSecure.delete(`/surveys/${id}`);
        if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${res.data.title} has been deleted!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Survey Master | Surveys</title>
            </Helmet>
            <h1 className='text-3xl font-bold text-center'>Your Surveys: {surveysBySurveyor.length}</h1>

            {
                surveysBySurveyor.length === 0 ? <p className='text-xl text-center my-5'>You have not added any surveys yet!</p> :
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Survey Title</th>
                                    <th>Category</th>
                                    <th>Deadline</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    surveysBySurveyor.map((survey, idx) => <tr key={survey._id} className="hover">
                                        <th>{idx + 1}</th>
                                        <td>{survey.title}</td>
                                        <td>{survey.category}</td>
                                        <td>{new Date(survey.deadline).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</td>
                                        <td>{survey.surveyStatus}</td>
                                        <td>
                                            <Link to={`/dashboard/surveyor/update/${survey._id}`}>
                                                <button className='btn btn-warning mr-2 mb-1 btn-sm tooltip' alt="Update" data-tip="Update"><FaPen></FaPen></button>
                                            </Link>
                                            <Link to={`/dashboard/surveyor/surveys/${survey._id}`}>
                                                <button className="btn btn-primary mr-2 mb-1 btn-sm tooltip" alt="Details" data-tip="Details"><FcViewDetails /></button>
                                            </Link>
                                            <button onClick={() => handleDeleteSurvey(survey._id)} className='btn btn-error btn-sm'><FaTrash></FaTrash></button>
                                        </td>
                                    </tr>)
                                }
                                {/* row 2 */}


                            </tbody>
                        </table>
                    </div>
            }

        </div>
    );
};

export default SurveysBySurveyor;