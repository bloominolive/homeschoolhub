import AuthForm from "./components/AuthForm"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
        <img src='/hhLogo.png' alt='logo' className="h-28 mb-4 rounded-lg"/>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Welcome to Homeschool Hub!
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
          Get your homeschool family organized with to-do's, assignment planning, 
          and more! Sign up for free and start keeping track of your family's learning digitally with Homeschool Hub!
          </p>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
              <AuthForm />
          </div>
      </div>
  </div>
  )
}
