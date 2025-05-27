
const Footer = () => {
  const year = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Use Cases", href: "#" },
        { name: "Roadmap", href: "#" },
        { name: "Changelog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Guides", href: "#" },
        { name: "API Reference", href: "#" },
        { name: "Community", href: "#" },
        { name: "Templates", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Media Kit", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "GDPR", href: "#" },
      ],
    },
  ];

  return (
    <footer className="p-5 px-17 bg-[#0f0f14] border-t-1 border-t-zinc-600 ">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <a href="#" className="inline-block">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">SaaSFlow</span>
            </a>
            <p className="mt-4 text-gray-400 max-w-xs">
              Build, deploy, and scale your SaaS application with our AI-powered platform.
            </p>
            <div className="mt-6 flex space-x-4">
              {["Twitter", "GitHub", "LinkedIn", "Discord"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((group) => (
            <div key={group.title} className="col-span-1">
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8  flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {year} SaaSFlow. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-500 text-xs">
              Made with ❤️ for creators worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;