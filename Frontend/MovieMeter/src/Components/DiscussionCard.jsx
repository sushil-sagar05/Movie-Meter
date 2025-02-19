

export default function DiscussionCard({ message, fullname }) {
  // Extract the first name and last name from the fullname object
  const displayName = fullname && fullname.firstname ? `${fullname.firstname} ${fullname.lastname}` : "Anonymous"; 

  return (
    <div className="container border-2 bg-white mb-1 rounded-lg shadow-md flex items-center h-12 w-full">
      <div className="comment pl-2">
        <h4 className='text-black font-serif'>
          {displayName}: {message}
        </h4>
      </div>
    </div>
  );
}
