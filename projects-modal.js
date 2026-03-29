// Project Modal Data
const projectsData = {
    learnhub: {
        title: "LearnHub - Learning Management System",
        image: "images/projects/Learnhub.jpg",
        description: "A comprehensive learning management system designed to facilitate online education. Features course management, student progress tracking, and interactive learning modules.",
        technologies: ["Python", "Django", "PostgreSQL", "HTML/CSS", "JavaScript"],
        features: [
            "User authentication and authorization",
            "Course creation and management",
            "Student enrollment system",
            "Progress tracking and analytics",
            "Interactive quiz system",
            "Payment integration"
        ],
        highlights: "Built with modern web technologies and designed for scalability",
        liveUrl: "https://britsyncaiacademy.online/"
    },
    linkedin: {
        title: "LinkedIn Automation - Langflow Integration",
        image: "images/projects/LinkedIn automation in langflow.jpg",
        description: "An intelligent automation tool for LinkedIn powered by Langflow. Automates networking, lead generation, and engagement activities using AI-driven workflows.",
        technologies: ["Langflow", "Python", "AI/ML", "LinkedIn API", "Automation"],
        features: [
            "Automated connection requests",
            "Smart message personalization",
            "Profile scraping and analysis",
            "Engagement automation",
            "Lead qualification workflow",
            "Analytics dashboard"
        ],
        highlights: "Leverages AI for intelligent networking and lead generation"
    },
    leads: {
        title: "Leads Scraper - Data Collection Tool",
        image: "images/projects/Leads Scrapper.jpg",
        description: "A powerful web scraping tool designed to collect and organize business leads from various online sources. Features advanced filtering and data export capabilities.",
        technologies: ["Python", "Selenium", "BeautifulSoup", "Scrapy", "Pandas"],
        features: [
            "Multi-source data scraping",
            "Advanced filtering options",
            "Data validation and cleaning",
            "Export to multiple formats (CSV, Excel, JSON)",
            "Automated scheduling",
            "Duplicate detection"
        ],
        highlights: "Efficient data collection with intelligent parsing and organization"
    },
    youtube: {
        title: "YouTube Automation - Content Management",
        image: "images/projects/YT Automation.jpg",
        description: "An automated system for managing YouTube content, including video scheduling, analytics tracking, and engagement optimization. Streamlines content creation workflow.",
        technologies: ["Python", "YouTube API", "FFmpeg", "AI Tools", "Cloud Storage"],
        features: [
            "Automated video scheduling",
            "Thumbnail generation",
            "SEO optimization",
            "Analytics tracking",
            "Comment management",
            "Content suggestions"
        ],
        highlights: "Complete automation solution for YouTube content creators"
    },
    study: {
        title: "AI Study Assistant - Learning Companion",
        image: "images/projects/Study assistant.jpg",
        description: "An intelligent study assistant powered by AI that helps students learn more effectively. Features personalized study plans, quiz generation, and progress tracking.",
        technologies: ["Python", "OpenAI API", "LangChain", "FastAPI", "React"],
        features: [
            "AI-powered explanations",
            "Personalized study plans",
            "Automatic quiz generation",
            "Progress tracking",
            "Study materials organization",
            "Smart reminders"
        ],
        highlights: "AI-driven personalized learning experience"
    },
    post: {
        title: "AI Post Generator - Content Creation",
        image: "images/projects/Post generator.jpg",
        description: "An AI-powered content generation tool for creating engaging social media posts. Supports multiple platforms and generates platform-optimized content.",
        technologies: ["Python", "OpenAI GPT", "LangChain", "Social Media APIs"],
        features: [
            "Multi-platform content generation",
            "Tone and style customization",
            "Hashtag suggestions",
            "Image caption generation",
            "Bulk content creation",
            "Content scheduling"
        ],
        highlights: "AI-generated content tailored for maximum engagement"
    },
    spotify: {
        title: "Spotify Clone - Music Streaming App",
        image: "images/projects/Simple Spotify Clone.jpg",
        description: "A fully functional music streaming application clone inspired by Spotify. Features music playback, playlists, search, and user accounts.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Spotify API"],
        features: [
            "Music streaming functionality",
            "Playlist creation and management",
            "Search and discovery",
            "User authentication",
            "Favorites and library",
            "Responsive design"
        ],
        highlights: "Full-stack music streaming platform with modern UI/UX"
    },
    business_assistant: {
        title: "Proactive AI Business Assistant",
        image: "images/projects/Business-Assistant.jpg",
        description: "A high-performance AI system built for Britsync AI, moving beyond static chatbots to act proactively—anticipating business needs and optimizing workflows in real-time.",
        technologies: ["Python", "FastAPI", "n8n", "AI Agents", "Automation"],
        features: [
            "Proactive Intelligence: Auto-flags critical business insights",
            "Workflow Optimization: Identifies and automates bottlenecks",
            "Smart Integrations: Multi-tool growth connectivity",
            "Real-time data processing",
            "Secured enterprise-grade architecture",
            "Scalable microservices design"
        ],
        highlights: "Moving beyond chatbots to proactive, real-time business intelligence"
    },
    discord_bot: {
        title: "Discord AI Chief of Staff",
        image: "images/projects/Discord-Bot.jpg",
        description: "A fully autonomous AI Voice Agent for Neurovane Pvt. Ltd. using Google Gemini 2.0. It bridges the gap between voice and productivity, turning Discord into a personal command center.",
        technologies: ["n8n", "Google Gemini 2.0 Flash", "Discord API", "Google Workspace", "JSON Parsing", "Webhooks"],
        features: [
            "100% Reliability: Discord-based bridge for regional stability",
            "Voice-to-Action: Speak tasks into existence",
            "Hands-free operations: Manage emails, calendars via voice",
            "Autonomous Agents: Multi-step task execution",
            "Custom Workflow Architecture",
            "Personalized Chief of Staff capabilities"
        ],
        highlights: "A seamless voice-to-action command center for daily operations"
    }
};

// Click Animation Handler
function handleCardClick(card, projectId) {
    // Add clicking class for ripple animation
    card.classList.add('clicking');

    // Wait for click animation to complete, then open modal
    setTimeout(() => {
        card.classList.remove('clicking');
        openModal(projectId);
    }, 400);
}

// Modal Functions
function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = projectsData[projectId];

    if (!project) return;

    modalBody.innerHTML = `
        <div class="modal-header">
            <img src="${project.image}" alt="${project.title}" class="modal-image">
            <div class="modal-title-section">
                <h2>${project.title}</h2>
                <p class="modal-description">${project.description}</p>
            </div>
        </div>
        
        <div class="modal-section">
            <h3>Technologies Used</h3>
            <div class="modal-tags">
                ${project.technologies.map(tech => `<span class="modal-tag">${tech}</span>`).join('')}
            </div>
        </div>
        
        <div class="modal-section">
            <h3>Key Features</h3>
            <ul class="modal-features">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-highlights">
            <div class="highlight-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                </svg>
            </div>
            <p>${project.highlights}</p>
        </div>
        
        ${project.liveUrl ? `
        <div class="modal-actions">
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="preview-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>Preview Live Site</span>
            </a>
        </div>
        ` : ''}
    `;

    // Small delay before showing modal for smoother transition
    requestAnimationFrame(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

function closeModal() {
    const modal = document.getElementById('projectModal');

    // Add closing animation class
    modal.classList.add('closing');

    // Wait for animation to complete before fully hiding
    setTimeout(() => {
        modal.classList.remove('active');
        modal.classList.remove('closing');
        document.body.style.overflow = 'auto';
    }, 500);
}

// Initialize Card Click Handlers
document.addEventListener('DOMContentLoaded', () => {
    // Get all bento cards and attach click handlers
    const bentoCards = document.querySelectorAll('.bento-card');

    bentoCards.forEach(card => {
        card.addEventListener('click', function (e) {
            const projectId = this.getAttribute('data-project');
            if (projectId) {
                handleCardClick(this, projectId);
            }
        });
    });

    // Prevent modal content click from closing modal
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Close modal on overlay click
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('projectModal');
        if (modal && modal.classList.contains('active')) {
            closeModal();
        }
    }
});
