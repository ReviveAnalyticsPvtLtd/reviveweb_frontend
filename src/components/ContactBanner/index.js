import Link from 'next/link';

const CallToActionButton = ({ text }) => (
    <Link href="/contact">
        <button className="relative overflow-hidden flex items-center justify-center py-2.5 px-6 mt-10 text-lg font-medium text-white border-2 border-white rounded-full group hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white transition-all duration-300 ease-in-out">
            <span className="absolute top-0 left-0 w-0 h-full bg-slate-900 group-hover:w-full transition-all duration-300 ease-linear"></span>
            <span className="relative">{text}</span>
        </button>
    </Link>
);


function ContactBanner() {
    return (
        // <section className="rounded-2xl flex justify-center items-center px-16 py-20 text-white bg-slate-900 sm:px-5 mt-20 mb-20">

        //     <div className="flex flex-col items-center mt-20 max-w-4xl w-full sm:mt-10">
        //         <h2 className="text-5xl font-bold text-center capitalize leading-tight sm:text-4xl sm:leading-normal">
        //             Ready to Start Work with Us?
        //         </h2>

        //         <CallToActionButton text="Contact Us" />
        //     </div>
        // </section>
        <section className="relative rounded-2xl overflow-hidden flex justify-center items-center px-16 py-20 text-white bg-slate-900 sm:px-5 mt-[144px] mb-[144px]">
            <div className="absolute inset-0 w-full h-full opacity-50 z-0">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb026e0f4e1ca6098a61cb69b534f9a840338302410e4c4c88b3326bceb6d5ff?apiKey=7b91412e16384e1384258b56fe71fd0b&"
                    className="object-cover w-full h-full"
                    alt="Background"
                />
            </div>
            <div className="flex flex-col items-center mt-20 max-w-4xl w-full sm:mt-10 relative z-10">
                <h2 className="text-5xl font-bold text-center capitalize leading-tight sm:text-4xl sm:leading-normal">
                    Ready to Start Work with Us?
                </h2>
                <CallToActionButton text="Contact Us" />
            </div>
        </section>
    );
}


export default ContactBanner;