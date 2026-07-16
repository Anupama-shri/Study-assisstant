const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} AI Study Assistant
        </p>

        
      </div>
    </footer>
  );
};

export default Footer;