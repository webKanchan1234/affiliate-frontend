import { useParams } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";

const DynamicPage = () => {
  const { pageName } = useParams();
  const normalizedPageName = pageName
  .replace(/-/g, "") // Remove hyphens
  .toLowerCase();
  // Define a mapping for components
  const pages = {
    aboutus: <About />,
    contactus: <Contact />,
    privacypolicy: <PrivacyPolicy />,
    termsandconditions: <TermsAndConditions />,
  };

  return pages[normalizedPageName] || <h1>Page Not Found</h1>;
};

export default DynamicPage;
