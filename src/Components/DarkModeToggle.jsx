const DarkModeToggle = () => {
    const toggleDark = ()=>{
        document.documentElement.classList.toggle('dark');
    };
  return (
    <div>
      <button onClick={toggleDark} className="text-sm bg-gray-300 dark:bg-gray-700 px-4 py-1 rounded">Toggle Dark Mode</button>
    </div>
  )
}

export default DarkModeToggle
