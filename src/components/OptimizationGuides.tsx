
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, Shield, TrendingUp, Settings, CheckCircle, AlertTriangle, 
  Database, Globe, Lock, Monitor, Gauge, Server 
} from "lucide-react";

export const OptimizationGuides = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Advanced Cloudways Optimization Guides
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Maximize your Cloudways performance with these expert optimization strategies
          </p>
        </div>

        <Tabs defaultValue="performance" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="scaling" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Scaling
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="mt-8">
            <Card className="border-emerald-200">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="w-6 h-6 text-emerald-600" />
                  How to Optimize Cloudways Hosting for Maximum Speed in 2025
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        Caching Configuration
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">1. Enable Varnish Cache</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Navigate to your application → Varnish → Enable Varnish
                          </p>
                          <Badge variant="outline" className="text-xs">
                            Can improve speed by 300-500%
                          </Badge>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">2. Configure Redis</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Application Settings → Redis → Enable for object caching
                          </p>
                          <Badge variant="outline" className="text-xs">
                            Reduces database queries by 80%
                          </Badge>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">3. Enable Memcached</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            For dynamic content caching and session storage
                          </p>
                          <Badge variant="outline" className="text-xs">
                            Improves dynamic page loading
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Database className="w-5 h-5 text-blue-600 mr-2" />
                        Database Optimization
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">Optimize database tables monthly using phpMyAdmin</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">Remove spam comments and revisions automatically</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">Use query optimization plugins for WordPress</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">Enable slow query logging to identify bottlenecks</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Globe className="w-5 h-5 text-purple-600 mr-2" />
                        CDN & Image Optimization
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">CloudwaysCDN Setup</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Enable CloudwaysCDN for global content delivery
                          </p>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            Application → CloudwaysCDN → Subscribe
                          </code>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">Image Optimization</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Convert images to WebP format</li>
                            <li>• Enable lazy loading for images</li>
                            <li>• Compress images before upload</li>
                            <li>• Use responsive image sizes</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Settings className="w-5 h-5 text-orange-600 mr-2" />
                        Server-Level Optimizations
                      </h3>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-3">PHP Configuration</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>PHP Version:</span>
                            <Badge variant="outline">Use latest stable (8.1+)</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Memory Limit:</span>
                            <Badge variant="outline">512M minimum</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Max Execution Time:</span>
                            <Badge variant="outline">300 seconds</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>OPcache:</span>
                            <Badge variant="outline">Enabled</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-3">Performance Testing Checklist</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-emerald-800 mb-2">Before Optimization:</h5>
                      <ul className="space-y-1 text-emerald-700">
                        <li>• Test with GTmetrix</li>
                        <li>• Run Pingdom speed test</li>
                        <li>• Check Google PageSpeed Insights</li>
                        <li>• Document current metrics</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-emerald-800 mb-2">After Optimization:</h5>
                      <ul className="space-y-1 text-emerald-700">
                        <li>• Re-test all speed metrics</li>
                        <li>• Monitor for 48 hours</li>
                        <li>• Check for any broken functionality</li>
                        <li>• Document improvements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-8">
            <Card className="border-red-200">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-6 h-6 text-red-600" />
                  Essential Security Steps for Cloudways Users
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Shield className="w-5 h-5 text-red-600 mr-2" />
                        Server Security
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                          <h4 className="font-medium text-gray-800 mb-2">1. Enable Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Account Settings → Security → Enable 2FA
                          </p>
                          <Badge variant="destructive" className="text-xs">
                            CRITICAL
                          </Badge>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">2. Configure Dedicated Firewall</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Server → Security → Configure IP whitelist and blacklist
                          </p>
                          <Badge variant="outline" className="text-xs">
                            Blocks 99% of malicious traffic
                          </Badge>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">3. Regular Security Patches</h4>
                          <p className="text-sm text-gray-600">
                            Auto-updates enabled for OS and server software
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Lock className="w-5 h-5 text-orange-600 mr-2" />
                        Application Security
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">Install security plugins (Wordfence, Sucuri)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">Keep all plugins and themes updated</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">Use strong admin passwords (20+ characters)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">Limit login attempts and hide admin URLs</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Database className="w-5 h-5 text-blue-600 mr-2" />
                        Backup & Recovery
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">Automated Backups</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Application → Backup & Restore → Schedule automatic backups
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">Daily recommended</Badge>
                            <Badge variant="outline" className="text-xs">Keep 7-30 days</Badge>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">Off-site Backup Storage</h4>
                          <p className="text-sm text-gray-600">
                            Configure external storage (Google Drive, Dropbox, AWS S3)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                        Security Monitoring
                      </h3>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-3">24/7 Monitoring Setup</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Enable bot protection</li>
                          <li>• Set up malware scanning</li>
                          <li>• Monitor file changes</li>
                          <li>• Track login attempts</li>
                          <li>• Configure security alerts</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-red-50 p-6 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Emergency Response Plan
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-red-800 mb-2">If Hacked:</h5>
                      <ol className="space-y-1 text-red-700 list-decimal list-inside">
                        <li>Change all passwords immediately</li>
                        <li>Restore from clean backup</li>
                        <li>Scan for malware</li>
                        <li>Update all software</li>
                      </ol>
                    </div>
                    <div>
                      <h5 className="font-medium text-red-800 mb-2">If Site Down:</h5>
                      <ol className="space-y-1 text-red-700 list-decimal list-inside">
                        <li>Check Cloudways status</li>
                        <li>Review error logs</li>
                        <li>Test from staging</li>
                        <li>Contact support if needed</li>
                      </ol>
                    </div>
                    <div>
                      <h5 className="font-medium text-red-800 mb-2">Prevention:</h5>
                      <ul className="space-y-1 text-red-700">
                        <li>• Regular security audits</li>
                        <li>• Keep software updated</li>
                        <li>• Monitor access logs</li>
                        <li>• Test backup restoration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="mt-8">
            <Card className="border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-6 h-6 text-blue-600" />
                  How to Monitor and Scale Your Cloudways Server
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Gauge className="w-5 h-5 text-blue-600 mr-2" />
                        Performance Monitoring
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">Built-in Monitoring</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Server → Monitoring & Logs → Real-time metrics
                          </p>
                          <div className="text-xs text-blue-700">
                            Track CPU, RAM, disk usage, and bandwidth
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">Custom Alerts</h4>
                          <p className="text-sm text-gray-600">
                            Set alerts for high resource usage, downtime, or errors
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                        Key Metrics to Watch
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium">CPU Usage</span>
                          <Badge variant="outline">Keep under 80%</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium">RAM Usage</span>
                          <Badge variant="outline">Keep under 85%</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium">Disk Usage</span>
                          <Badge variant="outline">Keep under 90%</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium">Response Time</span>
                          <Badge variant="outline">Under 200ms</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Server className="w-5 h-5 text-purple-600 mr-2" />
                        When to Scale Up
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                            Warning Signs
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• CPU usage consistently above 80%</li>
                            <li>• RAM usage above 85% for extended periods</li>
                            <li>• Page load times increasing</li>
                            <li>• Frequent 503 or timeout errors</li>
                            <li>• Database query times increasing</li>
                          </ul>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h4 className="font-medium text-gray-800 mb-2">Scaling Options</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• <strong>Vertical:</strong> Add more RAM/CPU to existing server</li>
                            <li>• <strong>Horizontal:</strong> Add load balancer + multiple servers</li>
                            <li>• <strong>Database:</strong> Separate database server</li>
                            <li>• <strong>CDN:</strong> Offload static content delivery</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3">Scaling Decision Matrix</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-purple-200">
                          <th className="text-left p-2">Traffic Level</th>
                          <th className="text-left p-2">Recommended Plan</th>
                          <th className="text-left p-2">RAM</th>
                          <th className="text-left p-2">Storage</th>
                          <th className="text-left p-2">Monthly Visitors</th>
                        </tr>
                      </thead>
                      <tbody className="space-y-1">
                        <tr className="border-b border-purple-100">
                          <td className="p-2 font-medium">Startup</td>
                          <td className="p-2">DigitalOcean $10</td>
                          <td className="p-2">1GB</td>
                          <td className="p-2">25GB</td>
                          <td className="p-2">Up to 25k</td>
                        </tr>
                        <tr className="border-b border-purple-100">
                          <td className="p-2 font-medium">Growing</td>
                          <td className="p-2">DigitalOcean $22</td>
                          <td className="p-2">2GB</td>
                          <td className="p-2">50GB</td>
                          <td className="p-2">25k - 100k</td>
                        </tr>
                        <tr className="border-b border-purple-100">
                          <td className="p-2 font-medium">Established</td>
                          <td className="p-2">DigitalOcean $42</td>
                          <td className="p-2">4GB</td>
                          <td className="p-2">80GB</td>
                          <td className="p-2">100k - 500k</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Enterprise</td>
                          <td className="p-2">Custom Setup</td>
                          <td className="p-2">8GB+</td>
                          <td className="p-2">160GB+</td>
                          <td className="p-2">500k+</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scaling" className="mt-8">
            <Card className="border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  Advanced Scaling Strategies for High-Traffic Websites
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="border-green-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Server className="w-5 h-5 text-green-600" />
                          Load Balancing
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-3">
                          Distribute traffic across multiple servers for better performance and reliability.
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Round-robin distribution</li>
                          <li>• Health check monitoring</li>
                          <li>• Automatic failover</li>
                          <li>• Session persistence</li>
                        </ul>
                        <Badge variant="outline" className="mt-3 text-xs">
                          For 100k+ monthly visitors
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Database className="w-5 h-5 text-blue-600" />
                          Database Scaling
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-3">
                          Optimize database performance with dedicated servers and replication.
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Dedicated database server</li>
                          <li>• Read/write splitting</li>
                          <li>• Database clustering</li>
                          <li>• Query optimization</li>
                        </ul>
                        <Badge variant="outline" className="mt-3 text-xs">
                          For database-heavy apps
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Globe className="w-5 h-5 text-purple-600" />
                          Global CDN
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-3">
                          Serve content from edge locations worldwide for faster global access.
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• 200+ global edge locations</li>
                          <li>• Image optimization</li>
                          <li>• Dynamic content caching</li>
                          <li>• DDoS protection</li>
                        </ul>
                        <Badge variant="outline" className="mt-3 text-xs">
                          Essential for global audience
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-4">Scaling Roadmap by Traffic Level</h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-green-800">0-50k monthly visitors</h5>
                          <p className="text-sm text-green-700">Single server with caching optimization</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-800">50k-200k monthly visitors</h5>
                          <p className="text-sm text-blue-700">Add CDN and database optimization</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-purple-800">200k-1M monthly visitors</h5>
                          <p className="text-sm text-purple-700">Implement load balancing and dedicated database</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-red-600 font-bold text-sm">4</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-red-800">1M+ monthly visitors</h5>
                          <p className="text-sm text-red-700">Multi-region deployment with auto-scaling</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
