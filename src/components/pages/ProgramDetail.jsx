import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useAuth } from "@/hooks/useAuth";
import { programService } from "@/services/api/programService";

const ProgramDetail = () => {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { hasRole, user } = useAuth();

  useEffect(() => {
    loadProgram();
  }, [slug]);

  const loadProgram = async () => {
    try {
      setError("");
      setIsLoading(true);
      const programs = await programService.getAll();
      const foundProgram = programs.find(p => p.slug === slug);
      
      if (foundProgram) {
        setProgram(foundProgram);
      } else {
        setError("Program not found");
      }
    } catch (err) {
      setError("Failed to load program details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleVariant = (role) => {
    switch (role) {
      case "free": return "default";
      case "member": return "primary";
      case "master": return "secondary";
      case "both": return "both";
      default: return "default";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "free": return "Unlock";
      case "member": return "User";
      case "master": return "Crown";
      case "both": return "Users";
      default: return "Lock";
    }
  };

  const programContent = {
    membership: {
      title: "Membership Program",
      description: "Learn how to build and scale sustainable membership businesses with proven strategies and frameworks.",
      modules: [
        "Foundation of Membership Models",
        "Creating Compelling Value Propositions",
        "Pricing Strategies & Tiers",
        "Community Building & Engagement",
        "Retention & Churn Prevention",
        "Scaling Your Membership Business"
      ],
      features: [
        "Interactive worksheets and templates",
        "Real-world case studies",
        "Community access",
        "Monthly live Q&A sessions"
      ]
    },
    "text-influencer": {
      title: "Text Influencer Mastery",
      description: "Master the art of influence through strategic writing and content creation across digital platforms.",
      modules: [
        "Psychology of Persuasive Writing",
        "Platform-Specific Content Strategies",
        "Building Your Personal Brand",
        "Monetization Techniques",
        "Analytics & Optimization",
        "Scaling Your Influence"
      ],
      features: [
        "Writing templates and frameworks",
        "Content calendar tools",
        "Engagement strategies",
        "Performance tracking methods"
      ]
    },
    only3: {
      title: "Only3 Method",
      description: "Focus on the three essential elements that drive 80% of your results in any business or project.",
      modules: [
        "Identifying Your Core 3",
        "Elimination Framework",
        "Focus Optimization",
        "Implementation Strategies",
        "Measuring Impact",
        "Continuous Refinement"
      ],
      features: [
        "Priority matrix tools",
        "Decision-making frameworks",
        "Time management systems",
        "Progress tracking dashboards"
      ]
    },
    gangjeomseungbu: {
      title: "Gangjeomseungbu Strategy",
      description: "Advanced strategic thinking and competitive positioning for market leadership.",
      modules: [
        "Market Analysis & Positioning",
        "Competitive Intelligence",
        "Strategic Planning",
        "Execution Excellence",
        "Performance Monitoring",
        "Adaptive Strategy"
      ],
      features: [
        "Strategy templates",
        "Market research tools",
        "Competitive analysis frameworks",
        "Implementation guides"
      ]
    },
    "daewoon-law": {
      title: "Daewoon Law Principles",
      description: "Fundamental principles and frameworks for business and personal success.",
      modules: [
        "Core Principles Overview",
        "Application in Business",
        "Personal Development",
        "Decision Making",
        "Risk Management",
        "Long-term Success"
      ],
      features: [
        "Principle application guides",
        "Case study library",
        "Assessment tools",
        "Progress tracking"
      ]
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !program) {
    return <Error message={error || "Program not found"} onRetry={loadProgram} />;
  }

  const hasAccess = hasRole(program.required_role);
  const content = programContent[slug] || {};
  const isMasterVersion = slug.includes("/master");

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Home
            </Link>
            <ApperIcon name="ChevronRight" size={16} />
            <Link to="/program" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Programs
            </Link>
            <ApperIcon name="ChevronRight" size={16} />
            <span className="text-gray-900 dark:text-gray-100">{program.title}</span>
          </div>
        </motion.nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                {content.title || program.title}
                {isMasterVersion && (
                  <Badge variant="secondary" className="ml-4">
                    <ApperIcon name="Crown" size={12} className="mr-1" />
                    Master
                  </Badge>
                )}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant={getRoleVariant(program.required_role)}>
                  <ApperIcon name={getRoleIcon(program.required_role)} size={12} className="mr-1" />
                  {program.required_role.charAt(0).toUpperCase() + program.required_role.slice(1)} Level
                </Badge>
                
                {hasAccess && (
                  <Badge variant="success">
                    <ApperIcon name="CheckCircle" size={12} className="mr-1" />
                    Access Granted
                  </Badge>
                )}
              </div>
            </div>
            
            {!hasAccess && (
              <div className="text-right">
                <ApperIcon name="Lock" size={24} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Upgrade Required</p>
              </div>
            )}
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {content.description || program.description || "This program is designed to provide comprehensive learning in this subject area."}
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Program Modules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                  <ApperIcon name="BookOpen" size={24} className="mr-3 text-primary-600" />
                  Course Modules
                </h2>
                
                <div className="space-y-4">
                  {(content.modules || [
                    "Introduction & Overview",
                    "Core Concepts",
                    "Practical Applications",
                    "Advanced Techniques",
                    "Case Studies",
                    "Final Project"
                  ]).map((module, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-4 rounded-lg border transition-all duration-200 ${
                        hasAccess
                          ? "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 cursor-pointer"
                          : "border-gray-200 dark:border-gray-700 opacity-50"
                      }`}
                    >
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-4">
                        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {module}
                        </h3>
                      </div>
                      {hasAccess ? (
                        <ApperIcon name="Play" size={16} className="text-primary-600" />
                      ) : (
                        <ApperIcon name="Lock" size={16} className="text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Program Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                  <ApperIcon name="Star" size={24} className="mr-3 text-accent-600" />
                  What's Included
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(content.features || [
                    "Comprehensive video lessons",
                    "Downloadable resources",
                    "Community access",
                    "Certificate of completion"
                  ]).map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <ApperIcon name="CheckCircle" size={16} className="text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Access Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="elevated">
                {hasAccess ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ApperIcon name="CheckCircle" size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      You Have Access!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Start learning right away with full access to all content.
                    </p>
                    <Button className="w-full mb-3">
                      <ApperIcon name="Play" size={16} className="mr-2" />
                      Start Learning
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/profile">
                        <ApperIcon name="User" size={16} className="mr-2" />
                        View Progress
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ApperIcon name="Lock" size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Upgrade Required
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      This program requires a {program.required_role} membership or higher.
                    </p>
                    <Button className="w-full mb-3">
                      <ApperIcon name="ArrowUp" size={16} className="mr-2" />
                      Upgrade Membership
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/program">
                        <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
                        Back to Programs
                      </Link>
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Program Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Program Details
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Duration</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">6-8 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Modules</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {content.modules?.length || 6}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Level</span>
                    <Badge variant={getRoleVariant(program.required_role)}>
                      {program.required_role.charAt(0).toUpperCase() + program.required_role.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Certificate</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Yes</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;