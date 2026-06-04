import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/i18n/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Helmet>
        <title>Pagină negăsită (404) — DSP Ilfov</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('nf.title')}</h1>
        <p className="text-xl text-gray-600 mb-4">{t('nf.message')}</p>
        <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
          {t('nf.back')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
