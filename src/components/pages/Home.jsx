import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: "BookOpen",
      title: "Comprehensive Programs",
      description: "Access a wide range of educational programs tailored to different skill levels and interests.",
      color: "from-primary-500 to-primary-600"
    },
    {
      icon: "TrendingUp",
      title: "Money Intelligence",
      description: "Develop financial literacy and investment strategies with our specialized money insight courses.",
      color: "from-secondary-500 to-secondary-600"
    },
    {
      icon: "Users",
      title: "Community Reviews",
      description: "Read authentic reviews from our learning community and share your own experiences.",
      color: "from-accent-500 to-accent-600"
    },
    {
      icon: "Award",
      title: "Role-Based Learning",
      description: "Unlock advanced content as you progress through different membership tiers.",
      color: "from-green-500 to-green-600"
    }
  ];

  const programs = [
    {
      title: "Membership Program",
      description: "Build sustainable membership businesses",
      slug: "membership",
      level: "Beginner to Advanced",
      icon: "Users"
    },
    {
      title: "Text Influencer",
      description: "Master the art of influence through writing",
      slug: "text-influencer",
      level: "Intermediate",
      icon: "PenTool"
    },
    {
      title: "Only3 Method",
      description: "Focus on the three essential elements",
      slug: "only3",
      level: "Advanced",
      icon: "Target"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Transform Your Learning</span>
              <br />
              <span className="text-gray-900 dark:text-gray-100">Journey Today</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of learners in our role-based educational platform. 
              Access premium programs, gain valuable insights, and grow with our community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/program">
                  <ApperIcon name="BookOpen" size={20} className="mr-2" />
                  Explore Programs
                </Link>
              </Button>
              
              {!isAuthenticated && (
                <Button variant="outline" size="lg">
                  <ApperIcon name="UserPlus" size={20} className="mr-2" />
                  Join Free Today
                </Button>
              )}
            </div>
            
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 inline-block"
              >
                <p className="text-gray-700 dark:text-gray-300">
                  Welcome back, <span className="font-semibold gradient-text">{user?.name}</span>! 
                  Ready to continue your learning journey?
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Why Choose LearnHub Pro?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the features that make our platform the perfect choice for your educational journey.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center`}>
                    <ApperIcon name={feature.icon} size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Programs */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Popular Programs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start your learning journey with our most popular and highly-rated programs.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-4">
                      <ApperIcon name={program.icon} size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {program.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {program.level}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {program.description}
                  </p>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/program/${program.slug}`}>
                      <ApperIcon name="ArrowRight" size={16} className="mr-2" />
                      Learn More
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" asChild>
              <Link to="/program">
                View All Programs
                <ApperIcon name="ArrowRight" size={20} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Join our community of learners and unlock your potential with role-based access to premium content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-gray-100" asChild>
                <Link to="/program">
                  <ApperIcon name="BookOpen" size={20} className="mr-2" />
                  Browse Programs
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-gray-100" asChild>
                <Link to="/money-insight">
                  <ApperIcon name="TrendingUp" size={20} className="mr-2" />
                  Money Insights
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;