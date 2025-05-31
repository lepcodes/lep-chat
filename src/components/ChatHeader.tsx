export default function ChatHeader( { className }: { className: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-400 text-center">
        Hi there! 👋 
      </h2>
      <h1 className="text-6xl md:text-[4rem] lg:text-7xl font-semibold text-gray-800 dark:text-gray-200 text-center ">
        Welcome, I'm<br/> <span className='text-gradient font-extrabold text-7xl md:text-[5.5rem] lg:text-8xl'>Luis Preciado</span>
      </h1>
      <p className="dark:text-gray-300 text-gray-600 text-center text-sm md:text-base w-[90%]">
        Explore my projects, learn about my skills, or contact me for more information.
      </p>
    </div>
  )
}