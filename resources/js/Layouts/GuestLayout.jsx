import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>
            <div className='mt-4 flex flex-col items-center'>
              <h1 className='font-bold text-3xl sm:text-4xl md:text-[40px] text-dark dark:text-gray-300 mb-4'>Hugo's Medical Trials App</h1>
              <h3 className='text-base dark:text-gray-400'>Tech Stack: <span className='text-amber-500 font-bold'>Laravel, Inertia, React, TailwindCSS</span> </h3>
              <p className='text-base dark:text-gray-400'>Github: <a href='https://github.com/HugoSuarezJr/laravel-react-medical-trial-app' target='_blank' className='hover:underline'>Laravel-React-Medical-Trial-App</a></p>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>

            <div className='mt-2'>
              <p className='text-base dark:text-gray-400'>*Contact me for access @<a href='https://hugosuarez.com/#contact' target='_blank' className='hover:underline'>hugosuarez.com</a></p>
            </div>

        </div>
    );
}
