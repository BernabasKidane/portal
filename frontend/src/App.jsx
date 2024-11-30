import { Box } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Sidebar component
import NavbarPage from "./components/Navbar"; // Navbar component
import Dashboard from "./pages/Dashboard"; // Dashboard layout
import CreatePage from "./pages/CreatePage"; // Create page layout
import CreateQuiz from "./pages/CreateQuiz"; // Create page layout
import Addresource from "./pages/Addresource"; // Layout page
import HomePage from "./pages/HomePage"; // Home page layout
import WelcomePage from "./pages/WelcomePage"; // Welcome page layout
import LoginPage from "./pages/LoginPage"; // Login page layout
import { useColorModeValue } from "@chakra-ui/react";
import CustomerFollowUpForm from "./components/CustomerFollowForm.jsx";
import FollowUpList from "./components/FollowUpList";
import SecondPage from "./pages/SecondPage";
import ThirdPage from "./pages/ThirdPage";
import FourthPage from "./pages/FourthPage";
import FifthPage from "./pages/FifthPage.jsx";
import QuizPage from "./pages/quizPage.jsx";
import Sdashboard from "./pages/sales/Sdashboard.jsx";
import PDFList from './components/PDFList';


/////////////////////////////////////////////////////
// customer service
import CustomerFollowup from "./components/customer/CustomerFollowup.jsx";
import AddCustomer from "./components/customer/AddCustomer";
import CResource from "./components/customer/CResource";
import CDashboard from "./components/customer/Cdashboard";
import VideoList from './components/customer/VideoList';
import UploadResource from './components/customer/UploadPage';
import Training from "./components/customer/training";
//////////////////////////////////////////////////////





function App() {
  const location = useLocation();

  // Define the paths where Sidebar and Navbar should not appear
  const noNavSidebarRoutes = ["/", "/login", "/secondpage", "/thirdpage", "/fourthpage", "/fifthpage", "/exam", "/sdashboard", "/AddCustomer",
    "/Resource",
    "/VideoList",
    "/UploadPage",
    "/PDF",
    "/Cdashboard",
    "/CResource",
    "/training",
    "/CustomerFollowup"]; // Fixed the casing issue

  // Check if the current path is a no-sidebar, no-navbar route
  const showNavAndSidebar = !noNavSidebarRoutes.includes(location.pathname);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")} pt={showNavAndSidebar ? "80px" : "0"}> {/* Adjust padding-top for navbar visibility */}

      {/* Conditionally render Navbar */}
      {showNavAndSidebar && <NavbarPage />}

      <Box display="flex" mt={showNavAndSidebar ? "60px" : "0"} flexDirection="row" width="100%">

        {/* Conditionally render Sidebar */}
        {showNavAndSidebar && <Sidebar />}

        {/* Main Content Area */}
        <Box
          flex="1"
          p={showNavAndSidebar ? 5 : 0}
          ml={showNavAndSidebar ? { base: "70px", md: "250px" } : 0} // Shift content to the right of sidebar
          transition="margin-left 0.3s ease" // Smooth transition
          width="100%" // Ensure full width when no sidebar
        >
          <Routes>

            {/* Define routes without Navbar and Sidebar */}
            <Route path="/" element={<WelcomePage />} /> {/* Welcome Page */}
            <Route path="/login" element={<LoginPage />} /> {/* Login Page */}
            <Route path="/secondpage" element={<SecondPage />} /> {/* Second Page */}
            <Route path="/thirdpage" element={<ThirdPage />} /> {/* Third Page */}
            <Route path="/fourthpage" element={<FourthPage />} /> {/* Fourth Page */}
            <Route path="/fifthpage" element={<FifthPage />} /> {/* Fifth Page */}
            <Route path="/exam" element={<QuizPage />} /> {/* Exam Page */}
            <Route path="/sdashboard" element={<Sdashboard />} />

            {/* Define routes with Navbar and Sidebar */}
            <Route path="/users" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/quiz" element={<CreateQuiz />} />
            <Route path="/resources" element={<PDFList />} />
            <Route path="/Addresource" element={<Addresource />} />
            <Route path="/FollowUpList" element={<FollowUpList />} />
            <Route path="/CustomerFollowUpForm" element={<CustomerFollowUpForm />} /> {/* Customer Follow-up Form */}




            {/* ///////////////////////////////////////////////// */}
            {/* Customer service */}
            <Route path="/PDF" element={<PDFList />} /> {/* PDF List Page */}
            <Route path="/CustomerFollowup" element={<CustomerFollowup />} />
            <Route path="/AddCustomer" element={<AddCustomer />} />
            {/* <Route path="/Resource" element={<Resource />} /> */}
            <Route path="/VideoList" element={<VideoList />} />
            <Route path="/UploadPage" element={<UploadResource />} />
            <Route path="/Cdashboard" element={<CDashboard />} />
            <Route path="/CResource" element={<CResource />} />
            <Route path="/training" element={<Training />} />



          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
