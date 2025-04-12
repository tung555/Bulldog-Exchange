const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Bulldog Marketplace. All rights reserved.
        </p>
        <p className="text-sm">
          Built by WebDev Gang.
        </p>
      </div>
    </footer>
  );
};

export default Footer;