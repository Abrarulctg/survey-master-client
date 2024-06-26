import React from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { FaFilePen, FaUsers } from "react-icons/fa6";
import { VscOutput } from "react-icons/vsc";


const FeaturedSurvey = () => {
    return (
        <div className=''>
            <SectionTitle subHeading={"Features"} heading={"Why Choose Survey Master"}></SectionTitle>
            <div className="divider"></div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  featureCard'>
                <div className='border p-4 lg:p-8 rounded-xl space-y-3 shadow-md mb-4 hover:bg-primary duration-500 hover:text-white hvr-grow'>
                    <FaFilePen className='text-3xl' />
                    <h2 className='text-2xl font-bold'>Easy Survey Creation</h2>
                    <p>Build surveys in minutes with our intuitive dashboard and Choose from a variety of question types to suit your needs</p>
                </div>
                <div className='border p-4 lg:p-8 rounded-xl space-y-3 shadow-md mb-4 hover:bg-primary duration-500 hover:text-white hvr-grow'>
                    <VscOutput className='text-3xl' />
                    <h2 className='text-2xl font-bold'>Real-time Results</h2>
                    <p>Get instant feedback with real-time response tracking and Visualize your data with beautiful charts and graphs.</p>
                </div>
                <div className='border p-4 lg:p-8 rounded-xl space-y-3 shadow-md mb-4 hover:bg-primary duration-500 hover:text-white hvr-grow'>
                    <FaUsers className='text-3xl' />
                    <h2 className='text-2xl font-bold'>Robust User Management</h2>
                    <p>Manage users effortlessly with our comprehensive admin dashboard and Assign roles and permissions to streamline your workflow.</p>
                </div>
            </div>
        </div>
    );
};

export default FeaturedSurvey;