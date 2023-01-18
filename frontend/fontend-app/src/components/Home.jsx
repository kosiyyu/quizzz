import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    return (<div className="container">
            <main className="text-center">
                <h1 className="display-4">Welcome to Quizzz!</h1>
                <p>
                    Quizzz is an application that allows you to create quizzes and save them in the system.
                    It allows you to solve them and returns the result of the solved quizzes.
                    The application is under development, but in the future it will be improved with authorizations in the backend and frontend, which means that local and external login and registration will be added, e.g. using "Google", "Amazon" or "Facebook".
                </p>
                <div className="services-container">
                    <ul className="list-group">
                        <li className="list-group-item active bg-dark border-0">The application consists of:</li>
                        <li className="list-group-item">Frontend written in React that uses Bootstrap</li>
                        <li className="list-group-item">Backend written in Flask</li>
                    </ul>
                </div>
            </main>
        </div>
    )
}