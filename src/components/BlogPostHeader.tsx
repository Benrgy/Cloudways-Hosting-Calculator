
import { Calendar, Clock, User } from "lucide-react";

interface BlogPostHeaderProps {
  post: {
    title: string;
    category: string;
    readTime: string;
    date: string;
    author: string;
    image: string;
  };
}

export const BlogPostHeader = ({ post }: BlogPostHeaderProps) => {
  return (
    <div className="relative">
      <div className="aspect-[21/9] bg-gray-200 relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 text-white p-8">
        <div className="container mx-auto">
          <div className="mb-4">
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-emerald-100">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
