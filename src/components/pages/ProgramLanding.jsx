import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { useAuth } from "@/hooks/useAuth";
import { programService } from "@/services/api/programService";

const ProgramLanding = () => {
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { hasRole } = useAuth();

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      setError("");
      setIsLoading(true);
      const data = await programService.getAll();
      setPrograms(data);
    } catch (err) {
      setError("Failed to load programs. Please try again.");
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

  if (isLoading) {
    return <Loading variant="skeleton" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadPrograms} />;
  }

  if (programs.length === 0) {
    return (
      <Empty
        title="No Programs Available"
        message="There are currently no programs available. Check back later for new content."
        icon="BookOpen"
      />
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Learning Programs
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive collection of educational programs designed to help you grow 
            and succeed in your chosen field. Each program is carefully crafted with role-based access 
            to ensure you get the most relevant content for your level.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const hasAccess = hasRole(program.required_role);
            
            return (
              <motion.div
                key={program.Id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full hover:shadow-xl transition-all duration-300 ${
                  hasAccess ? "hover:scale-[1.02]" : "opacity-75"
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-4">
                        <ApperIcon name="BookOpen" size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                          {program.title}
                        </h3>
                        <Badge variant={getRoleVariant(program.required_role)}>
                          <ApperIcon name={getRoleIcon(program.required_role)} size={12} className="mr-1" />
                          {program.required_role.charAt(0).toUpperCase() + program.required_role.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    {!hasAccess && (
                      <ApperIcon name="Lock" size={16} className="text-gray-400" />
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">
                    {program.description || "Comprehensive program designed to enhance your skills and knowledge in this area."}
                  </p>
                  
                  <div className="mt-auto">
                    {hasAccess ? (
                      <Button className="w-full" asChild>
                        <Link to={`/program/${program.slug}`}>
                          <ApperIcon name="ArrowRight" size={16} className="mr-2" />
                          Access Program
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        <ApperIcon name="Lock" size={16} className="mr-2" />
                        Upgrade Required
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card variant="glass" className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Want Access to More Programs?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Upgrade your membership to unlock advanced programs and exclusive content 
              designed for serious learners.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <ApperIcon name="Crown" size={20} className="mr-2" />
                Upgrade Membership
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link to="/reviews">
                  <ApperIcon name="Star" size={20} className="mr-2" />
                  Read Reviews
                </Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgramLanding;