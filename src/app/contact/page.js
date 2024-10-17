'use client'
import * as React from "react";
import FooterComponent from "@/components/Footer";
import NavBar from "@/components/header/Navbar";
import CustomCursor from "../../components/CustomCursor";
import CareersForm from "./careers";
import ContactForm from "./contact";
function CountryTab({ countryName, isActive }) {
    return (
        <div className={`justify-center items-start px-10 py-5 border-r border-solid ${isActive ? "bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)]" : "bg-slate-200"} border-neutral-900 max-md:px-5`}>
            {countryName}
        </div>
    );
}

function CountrySelector() {
    return (
        <nav className="flex gap-0 pr-20 text-sm leading-5 whitespace-nowrap rounded-3xl bg-slate-200 text-zinc-800 max-md:flex-wrap max-md:pr-5">
            <CountryTab countryName="USA" isActive={true} />
            <CountryTab countryName="INDIA" isActive={false} />
        </nav>
    );
}

const Button = ({ children, className, name, setActiveTab, onClick }) => (
    <div onClick={() => setActiveTab(name)} className={`flex flex-col justify-center ${className}`}>
        <div className="justify-center items-start px-10 py-5 rounded-xl border border-solid border-neutral-900">
            {children}
        </div>
    </div>
);

const gradientbgButton = `rounded-xl text-white bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)]`
const buttons = [
    { label: "Business", className: "rounded-xl text-zinc-800 bg-neutral-100", name: 'contact' },
    { label: "Career", className: gradientbgButton, name: 'career' },
];

function ButtonComponent({ setActiveTab, activeTab }) {
    return (
        <div className="container mx-auto cursor-pointer mx-auto mb-10 flex gap-2 text-sm leading-5 max-w-[206px]">
            {buttons.map(({ label, className, name }) => (
                <Button key={label} className={activeTab === name ? gradientbgButton : ''} name={name} setActiveTab={setActiveTab}>
                    {label}
                </Button>
            ))
            }
        </div >
    );
}




function ContactPage(props) {
    const [activeTab, setActiveTab] = React.useState("contact");
    const buttonsLocation = [
        { label: "USA", className: "rounded-xl text-zinc-800 bg-neutral-100", name: 'USA' },
        { label: "INDIA", className: gradientbgButton, name: 'INDIA' },
        { label: "AUSTRALIA", className: gradientbgButton, name: 'AUSTRALIA' },

    ];

    const [activeLocation, setActiveLocation] = React.useState("USA");


    const handleChange = (newname) => {
        console.log(newname, 'newname')
        setActiveLocation(newname);
    }


    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const url = window.location.href;
            const lastSlashIndex = url.lastIndexOf('/');
            const afterSlash = url.substring(lastSlashIndex + 1);
            if (afterSlash === 'contact#Careers') {
                setActiveTab('career');
            }
        }


    },[]);

    return (
        <>
            <CustomCursor />
            <NavBar />
            <div className="relative">
                <div
                    className="h-[500px] bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/becdd01746f54788b2b212b1d6255e1ab3fad62ed0a1ec047f3f48416275c1b0?apiKey=7b91412e16384e1384258b56fe71fd0b')`
                    }}
                >
                    <div className="container mx-auto absolute inset-0 flex items-center justify-center">
                        <h1 className="relative text-white text-6xl font-bold">
                            CONTACT US
                            <span className="absolute inset-0 bg-white bg-opacity-10 blur-sm"></span>
                        </h1>
                    </div>
                </div>
            </div>



            <div className="mb-10  flex flex-col items-center bg-gray-200">
                <div className="flex gap-0 pr-20 mt-36 max-w-full text-sm leading-5 whitespace-nowrap rounded-3xl bg-slate-200 text-zinc-800 w-[1712px] max-md:flex-wrap max-md:pr-5 max-md:mt-10">
                    <ButtonComponent setActiveTab={setActiveTab} activeTab={activeTab} />
                </div>
                {activeTab === "contact" ? <ContactForm /> : <CareersForm />}

                <div className="container mx-auto flex gap-0 pr-20 mt-36 max-w-full text-sm leading-5 whitespace-nowrap rounded-3xl bg-slate-200 text-zinc-800 w-[1712px] max-md:flex-wrap max-md:pr-5 max-md:mt-10">
                    <div className="cursor-pointer mx-auto mb-10 flex gap-2 text-sm leading-5 max-w-[206px]">
                        {buttonsLocation.map(({ label, className, name }) => (
                            <Button key={label} className={name === activeLocation ? gradientbgButton : ''} name={name} setActiveTab={setActiveLocation}>
                                {label}
                            </Button>
                        ))
                        }
                    </div >
                </div>
                {activeLocation === "USA" && <div className="mb-20 mt-10 w-full rounded-3xl border-2 border-solid border-[color:var(--footer-black,#0F0E0E)] max-w-[1712px] max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
                            <div className="rounded-s-2xl flex flex-col grow items-start py-12 pr-20 pl-10 w-full text-base leading-6 text-white whitespace-nowrap bg-slate-900 max-md:px-5 max-md:max-w-full">
                                <div className="text-2xl font-medium">USA</div>
                                <div className="mt-7">Broomfield, Denver Colorado USA</div>
                                <div className="mt-7">Email: connect@reviveanalytics.com</div>
                            </div>
                        </div>
                        <div className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full">
                            <div style={{ width: '100%' }}>
                                <iframe
                                    className="rounded-3xl"
                                    width="100%"
                                    height="600"
                                    frameborder="0"
                                    scrolling="no"
                                    marginheight="0"
                                    marginwidth="0"
                                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Broomfield,%20Denver%20Colorado%20USA+(Revive%20Analytics)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                    allowfullscreen
                                >
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>}

                {activeLocation === "INDIA" &&
                    <div className="mb-20 mt-10 w-full rounded-3xl border-2 border-solid border-[color:var(--footer-black,#0F0E0E)] max-w-[1712px] max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                            <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
                                <div className="rounded-s-2xl flex flex-col grow items-start py-12 pr-20 pl-10 w-full text-base leading-6 text-white whitespace-nowrap bg-slate-900 max-md:px-5 max-md:max-w-full">
                                    <div className="text-2xl font-medium">INDIA</div>
                                    <div className="mt-7"> M.P Nagar, Bhopal, India</div>
                                    <div className="mt-7">Email: connect@reviveanalytics.com</div>
                                </div>
                            </div>
                            <div className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full">
                                <div style={{ width: '100%' }}>
                                    <iframe
                                        className="rounded-3xl"
                                        width="100%"
                                        height="600"
                                        frameborder="0"
                                        scrolling="no"
                                        marginheight="0"
                                        marginwidth="0"
                                        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Mp%20nagar%20bhopal+(Revive%20Analytics)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                        allowfullscreen
                                    >
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {activeLocation === "AUSTRALIA" && <div className="mb-20 mt-10 w-full rounded-3xl border-2 border-solid border-[color:var(--footer-black,#0F0E0E)] max-w-[1712px] max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
                            <div className="rounded-s-2xl flex flex-col grow items-start py-12 pr-20 pl-10 w-full text-base leading-6 text-white whitespace-nowrap bg-slate-900 max-md:px-5 max-md:max-w-full">
                                <div className="text-2xl font-medium">USA</div>
                                <div className="mt-7">Tallawong, Sydney 2762, Australia </div>
                                <div className="mt-7">Email: connect@reviveanalytics.com</div>
                            </div>
                        </div>
                        <div className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full">
                            <div style={{ width: '100%' }}>
                                <iframe
                                    className="rounded-3xl"
                                    width="100%"
                                    height="600"
                                    frameborder="0"
                                    scrolling="no"
                                    marginheight="0"
                                    marginwidth="0"
                                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Tallawong,%20Sydney%20Australia%202762+(Revive%20Analytics)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                    allowfullscreen
                                >
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>}


            </div>

            <div><FooterComponent /></div>

        </>
    )
}

export default ContactPage