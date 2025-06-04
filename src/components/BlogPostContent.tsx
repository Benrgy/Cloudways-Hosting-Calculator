
interface BlogPostContentProps {
  content: string;
}

export const BlogPostContent = ({ content }: BlogPostContentProps) => {
  const handleCalculateClick = () => {
    window.open('https://www.cloudways.com/en/?id=1384181', '_blank');
  };

  return (
    <article className="py-16 bg-gradient-to-br from-white via-emerald-50/30 to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg prose-emerald max-w-none animate-fade-in"
            style={{
              lineHeight: '1.8',
              fontSize: '18px'
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          
          {/* Call to Action with enhanced styling */}
          <div className="mt-12 p-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl border-0 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 animate-pulse">
                🚀 Ready to Calculate Your Migration Savings?
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                Use our free calculator to see how much you could save by migrating 
                from shared hosting to Cloudways managed cloud hosting.
              </p>
              <button 
                onClick={handleCalculateClick}
                className="inline-block bg-white text-emerald-600 hover:text-emerald-700 font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  ⚡ Get Started with Cloudways
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .animate-fade-in {
            animation: fade-in 0.8s ease-out;
          }
          
          .prose {
            color: #374151;
            max-width: none;
            animation: fade-in 1s ease-out 0.2s both;
          }
          
          .prose p {
            margin-bottom: 1.75rem !important;
            line-height: 1.8 !important;
            font-size: 18px !important;
            color: #4b5563 !important;
            transition: color 0.3s ease;
          }
          
          .prose p:hover {
            color: #374151 !important;
          }
          
          .prose h1 {
            font-size: 2.5rem !important;
            font-weight: 800 !important;
            margin-top: 3rem !important;
            margin-bottom: 1.5rem !important;
            line-height: 1.2 !important;
            background: linear-gradient(135deg, #059669, #0891b2) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            animation: fade-in 1s ease-out 0.3s both;
          }
          
          .prose h2 {
            font-size: 2rem !important;
            font-weight: 700 !important;
            margin-top: 3rem !important;
            margin-bottom: 1.25rem !important;
            line-height: 1.3 !important;
            color: #0891b2 !important;
            border-bottom: 3px solid transparent !important;
            background: linear-gradient(90deg, #059669, #0891b2) !important;
            background-size: 100% 3px !important;
            background-repeat: no-repeat !important;
            background-position: 0 100% !important;
            padding-bottom: 0.5rem !important;
            transition: all 0.3s ease !important;
            animation: fade-in 1s ease-out 0.4s both;
          }
          
          .prose h2:hover {
            transform: translateX(10px) !important;
          }
          
          .prose h3 {
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            margin-top: 2.5rem !important;
            margin-bottom: 1rem !important;
            line-height: 1.4 !important;
            color: #059669 !important;
            transition: color 0.3s ease !important;
            animation: fade-in 1s ease-out 0.5s both;
          }
          
          .prose h3:hover {
            color: #047857 !important;
          }
          
          .prose h4, .prose h5, .prose h6 {
            color: #374151 !important;
            transition: color 0.3s ease !important;
            animation: fade-in 1s ease-out 0.6s both;
          }
          
          .prose h1:first-child, 
          .prose h2:first-child, 
          .prose h3:first-child,
          .prose h4:first-child,
          .prose h5:first-child,
          .prose h6:first-child {
            margin-top: 0 !important;
          }
          
          .prose ul, .prose ol {
            margin-top: 1.5rem !important;
            margin-bottom: 2rem !important;
            padding-left: 1.5rem !important;
            animation: fade-in 1s ease-out 0.7s both;
          }
          
          .prose li {
            margin-bottom: 0.75rem !important;
            line-height: 1.7 !important;
            font-size: 18px !important;
            transition: transform 0.2s ease, color 0.3s ease !important;
            position: relative !important;
          }
          
          .prose li:hover {
            transform: translateX(5px) !important;
            color: #059669 !important;
          }
          
          .prose li::marker {
            color: #059669 !important;
            font-size: 1.2em !important;
          }
          
          .prose li:before {
            content: '' !important;
            position: absolute !important;
            left: -1.5rem !important;
            top: 0.6em !important;
            width: 0 !important;
            height: 2px !important;
            background: linear-gradient(90deg, #059669, #0891b2) !important;
            transition: width 0.3s ease !important;
          }
          
          .prose li:hover:before {
            width: 1rem !important;
          }
          
          .prose blockquote {
            margin-top: 2rem !important;
            margin-bottom: 2rem !important;
            padding: 1.5rem !important;
            background: linear-gradient(135deg, #f0fdf4, #ecfdf5) !important;
            border-left: 4px solid #059669 !important;
            font-style: italic !important;
            position: relative !important;
            overflow: hidden !important;
            animation: fade-in 1s ease-out 0.8s both;
          }
          
          .prose blockquote:before {
            content: '"' !important;
            font-size: 4rem !important;
            color: #059669 !important;
            position: absolute !important;
            top: -0.5rem !important;
            left: 1rem !important;
            opacity: 0.3 !important;
          }
          
          .prose strong {
            font-weight: 700 !important;
            background: linear-gradient(135deg, #059669, #0891b2) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            transition: all 0.3s ease !important;
          }
          
          .prose code {
            background: linear-gradient(135deg, #f3f4f6, #e5e7eb) !important;
            padding: 0.25rem 0.5rem !important;
            border-radius: 0.375rem !important;
            font-size: 0.875rem !important;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
            border: 1px solid #d1d5db !important;
            transition: all 0.3s ease !important;
          }
          
          .prose code:hover {
            background: linear-gradient(135deg, #e5e7eb, #d1d5db) !important;
            transform: scale(1.05) !important;
          }
          
          .prose pre {
            background: linear-gradient(135deg, #1f2937, #374151) !important;
            color: #f9fafb !important;
            padding: 1.5rem !important;
            border-radius: 0.5rem !important;
            margin: 2rem 0 !important;
            overflow-x: auto !important;
            border: 1px solid #4b5563 !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
            animation: fade-in 1s ease-out 0.9s both;
          }
          
          .prose pre code {
            background: transparent !important;
            color: inherit !important;
            padding: 0 !important;
            border: none !important;
          }
          
          .prose img {
            margin: 2rem 0 !important;
            border-radius: 0.5rem !important;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
            transition: all 0.3s ease !important;
            animation: fade-in 1s ease-out 1s both;
          }
          
          .prose img:hover {
            transform: scale(1.02) rotate(0.5deg) !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
          }
          
          .prose hr {
            margin: 3rem 0 !important;
            height: 2px !important;
            background: linear-gradient(90deg, transparent, #059669, #0891b2, transparent) !important;
            border: none !important;
            animation: fade-in 1s ease-out 1.1s both;
          }
          
          .prose a {
            color: #059669 !important;
            text-decoration: underline !important;
            font-weight: 500 !important;
            transition: all 0.3s ease !important;
            position: relative !important;
            background: linear-gradient(135deg, #059669, #0891b2) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
          }
          
          .prose a:hover {
            transform: translateY(-1px) !important;
            text-shadow: 0 4px 8px rgba(5, 150, 105, 0.3) !important;
          }
          
          /* Emoji animations */
          .prose p:has(✅), .prose p:has(🔍), .prose p:has(📁), .prose p:has(💾), .prose p:has(📧), .prose p:has(🛠️), .prose p:has(🔗), .prose p:has(👉), .prose p:has(💡), .prose p:has(🕒), .prose p:has(🔐), .prose p:has(🔄), .prose p:has(📤), .prose p:has(🧩), .prose p:has(⚡) {
            margin-bottom: 1rem !important;
            padding: 1rem !important;
            background: linear-gradient(135deg, #f0fdf4, #ecfdf5) !important;
            border-radius: 0.5rem !important;
            border-left: 4px solid #059669 !important;
            transition: all 0.3s ease !important;
            animation: fade-in 1s ease-out 1.2s both;
          }
          
          .prose p:has(✅):hover, .prose p:has(🔍):hover, .prose p:has(📁):hover, .prose p:has(💾):hover, .prose p:has(📧):hover, .prose p:has(🛠️):hover, .prose p:has(🔗):hover, .prose p:has(👉):hover, .prose p:has(💡):hover, .prose p:has(🕒):hover, .prose p:has(🔐):hover, .prose p:has(🔄):hover, .prose p:has(📤):hover, .prose p:has(🧩):hover, .prose p:has(⚡):hover {
            transform: translateX(10px) !important;
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.15) !important;
          }
        `
      }} />
    </article>
  );
};
