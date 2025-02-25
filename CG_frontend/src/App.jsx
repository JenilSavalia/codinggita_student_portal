
import './App.css'
import Events from './Modules/EventsPage/Events'
import ActivityPage from './Modules/ActivityPage/ActivityPage'
import Navbar from './Modules/Header/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Modules/Authentication/Login';
import SignUp from './Modules/Authentication/SignUp';
import LandingPage from './Modules/LandingPage/LandingPage';
import Newsletter from './Modules/NewsletterPage/Newsletter';
import Revamp from './Modules/Revamp';
import { Revamp2 } from './Modules/Revamp2';
import PortfolioSetup from './Modules/PortfolioPage/PortfolioSetup';
import ProtectedRoute from './Modules/ProtectedRoute';
import ProjectPage from './Modules/ProjectPage/ProjectPage';
import { ProjectDetails } from './Modules/ProjectPage/ProjectDetails';
import HeroPortfolio from './Modules/ProjectPage/HeroPortfolio';
import NotFound from './Modules/PageNotFound'
import Dashboard from './Modules/Dashboard/StudentDashboard';
import Resources from './Modules/Resources/Resources';
import LeetTracker from './Modules/LeetcodeTracker/LeetTracker';
import TutorDashboard from './Modules/TutorDashboard/TutorDashboard';
import AdminDashboard from './Modules/Dashboard/AdminDashboard';
import AdminSidebar from './Modules/Dashboard/AdminSidebar';
import StudentSidebar from './Modules/Dashboard/StudentSidebar';
import TutorSidebar from './Modules/TutorDashboard/TutorSidebar';
import Unauthorized from './Modules/Unauthorized';
import AdminUsersList from './Modules/Dashboard/AdminUsersList';
import AdminGroups from './Modules/Dashboard/AdminGroups';
import GroupDetails from './Modules/Dashboard/GroupDetails';

function App() {

  return (
    <>
      <Router>
        <Routes>


          <Route element={<Revamp2 />}>
            <Route
              path="/port"
              element={
                <ProtectedRoute>
                  <PortfolioSetup />
                </ProtectedRoute>
              }
            />
            <Route path="/myport" element={<HeroPortfolio />} />

            <Route path="/project" element={<ProjectPage />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/event" element={<Events />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/tracker" element={<LeetTracker />} />


            <Route path="/" element={<LandingPage />} />


            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/newsletter" element={<Newsletter />} />

            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path='*' element={<NotFound />} />

          </Route>

          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}



          {/* Protected Routes with Role-Based Access */}


          <Route element={<AdminSidebar />}>
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute access="Admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/users"
              element={
                <ProtectedRoute access="Admin">
                  <AdminUsersList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/groups"
              element={
                <ProtectedRoute access="Admin">
                  <AdminGroups />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/groups/:groupId"
              element={
                <ProtectedRoute access="Admin">
                  <GroupDetails />
                </ProtectedRoute>
              }
            />
          </Route>


          {/* <Route
            path="/dashboard/admin/users"
            element={
              <ProtectedRoute access="Admin">
                <AdminUsersList />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/dashboard/tutor"
            element={
              <ProtectedRoute access="Tutor">
                <TutorSidebar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute access="Student">
                <StudentSidebar />
              </ProtectedRoute>
            }
          />




        </Routes>
      </Router>
    </>
  )
}

export default App
