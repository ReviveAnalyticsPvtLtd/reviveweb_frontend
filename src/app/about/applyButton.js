import Link from 'next/link';

const ApplyButton = () => {
  const url = `/careers`

  return (
    <Link href={url}>
      <div className="justify-center self-start px-6 py-3 mt-8 mb-8 text-2xl leading-8 bg-teal-400 rounded-[40px] md:px-5 md:mt-10">
        Join Us
        
      </div>
    </Link>
  );
};

export default ApplyButton;
