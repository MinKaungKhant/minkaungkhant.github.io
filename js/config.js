// Portfolio Configuration
// Update this file to customize your portfolio content

const portfolioConfig = {
    // Personal Information
    personal: {
        name: "Min Kaung Khant",
        title: "Senior .NET Developer",
        email: "min.kaungkhant@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        description: "Crafting robust, scalable applications with cutting-edge .NET technologies. Passionate about clean code, modern architecture, and delivering exceptional user experiences."
    },

    // Social Media Links
    social: {
        linkedin: "https://linkedin.com/in/minkaungkhant",
        github: "https://github.com/MinKaungKhant", 
        twitter: "https://twitter.com/minkaungkhant",
        email: "mailto:min.kaungkhant@email.com"
    },

    // Skills Configuration
    skills: {
        backend: [
            { name: "ASP.NET Core", level: 95, icon: "dotnetcore" },
            { name: "C#", level: 95, icon: "csharp" },
            { name: "SQL Server", level: 90, icon: "microsoftsqlserver" },
            { name: "PostgreSQL", level: 85, icon: "postgresql" }
        ],
        frontend: [
            { name: "JavaScript", level: 85, icon: "javascript" },
            { name: "React", level: 80, icon: "react" },
            { name: "Blazor", level: 90, icon: "blazor" },
            { name: "HTML5/CSS3", level: 90, icon: "html5" }
        ],
        cloud: [
            { name: "Microsoft Azure", level: 85, icon: "azure" },
            { name: "Docker", level: 80, icon: "docker" },
            { name: "Kubernetes", level: 75, icon: "kubernetes" },
            { name: "Git/GitHub", level: 90, icon: "git" }
        ]
    },

    // Projects Configuration
    projects: [
        {
            title: "E-Commerce Platform",
            description: "Full-stack e-commerce solution built with ASP.NET Core, React, and SQL Server. Features include payment integration, inventory management, and real-time notifications.",
            technologies: ["ASP.NET Core", "React", "SQL Server", "Azure"],
            image: "images/project1.jpg",
            liveUrl: "https://example.com",
            githubUrl: "https://github.com/MinKaungKhant/ecommerce"
        },
        {
            title: "Microservices Architecture",
            description: "Scalable microservices system with Docker containerization, Kubernetes orchestration, and comprehensive API gateway implementation.",
            technologies: [".NET 6", "Docker", "Kubernetes", "Redis"],
            image: "images/project2.jpg", 
            liveUrl: "https://example.com",
            githubUrl: "https://github.com/MinKaungKhant/microservices"
        },
        {
            title: "Enterprise CRM System",
            description: "Comprehensive customer relationship management system with advanced analytics, reporting, and integration capabilities for enterprise clients.",
            technologies: ["Blazor Server", "Entity Framework", "PostgreSQL", "SignalR"],
            image: "images/project3.jpg",
            liveUrl: "https://example.com", 
            githubUrl: "https://github.com/MinKaungKhant/crm"
        }
    ],

    // Work Experience
    experience: [
        {
            title: "Senior .NET Developer",
            company: "Tech Solutions Inc.",
            period: "2022 - Present",
            description: "Leading development of enterprise-level applications using .NET 6/7, implementing microservices architecture, and mentoring junior developers. Responsible for technical decision-making and code reviews.",
            skills: ["ASP.NET Core", "Microservices", "Azure", "Team Leadership"]
        },
        {
            title: ".NET Developer", 
            company: "Digital Innovations Ltd.",
            period: "2020 - 2022",
            description: "Developed and maintained web applications using ASP.NET Core and Entity Framework. Collaborated with cross-functional teams to deliver high-quality software solutions.",
            skills: ["ASP.NET Core", "Entity Framework", "SQL Server", "React"]
        },
        {
            title: "Junior .NET Developer",
            company: "StartUp Technologies",
            period: "2019 - 2020", 
            description: "Started my professional journey working on various .NET projects, learning best practices, and contributing to the development of customer-facing applications.",
            skills: ["ASP.NET MVC", "C#", "JavaScript", "SQL"]
        }
    ],

    // Statistics
    stats: [
        { number: 50, label: "Projects Completed" },
        { number: 5, label: "Years Experience" }, 
        { number: 20, label: "Technologies" }
    ],

    // Theme Colors (CSS Custom Properties)
    theme: {
        primary: "#667eea",
        secondary: "#764ba2", 
        background: "#0a0a0a",
        text: "#ffffff",
        textSecondary: "#b3b3b3"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioConfig;
}
