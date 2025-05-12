import React from 'react';
import Link from 'next/link';
import { Lock, Key, Shield, Cpu, ArrowRight, CheckCircle, Code, BookOpen } from 'lucide-react';

// Using shadcn/ui components - import each component from its own file
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

// Define the type for algorithm data
interface Algorithm {
  name: string;
  category: string;
  description: string;
  keySize: string;
  use: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

const EncryptionHomepage = () => {
  const algorithms: Algorithm[] = [
    {
      name: "AES",
      category: "Symmetric",
      description: "Advanced Encryption Standard, widely used for secure data transmission",
      keySize: "128/192/256 bits",
      use: "File encryption, VPNs, SSL/TLS",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-blue-500",
      href: "/aes"
    },
    {
      name: "RSA",
      category: "Asymmetric",
      description: "Rivest-Shamir-Adleman, one of the first public-key cryptosystems",
      keySize: "1024-4096 bits",
      use: "Digital signatures, HTTPS, Email",
      icon: <Key className="w-8 h-8" />,
      color: "bg-green-500",
      href: "/rsa"
    },
    {
      name: "ECC",
      category: "Asymmetric",
      description: "Elliptic Curve Cryptography, efficient public-key encryption",
      keySize: "192-521 bits",
      use: "Mobile devices, IoT, Modern protocols",
      icon: <Cpu className="w-8 h-8" />,
      color: "bg-purple-500",
      href: "/ecc"
    },
    {
      name: "ChaCha20",
      category: "Stream",
      description: "Fast and secure stream cipher, alternative to AES",
      keySize: "256 bits",
      use: "Mobile apps, High-speed encryption",
      icon: <Lock className="w-8 h-8" />,
      color: "bg-orange-500",
      href: "/chacha20"
    },
    {
      name: "Blowfish",
      category: "Symmetric",
      description: "Block cipher designed as an alternative to DES",
      keySize: "32-448 bits",
      use: "Password hashing, Legacy systems",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-red-500",
      href: "/blowfish"
    },
    {
      name: "Twofish",
      category: "Symmetric",
      description: "Successor to Blowfish, AES finalist algorithm",
      keySize: "128/192/256 bits",
      use: "Disk encryption, File protection",
      icon: <Key className="w-8 h-8" />,
      color: "bg-teal-500",
      href: "/twofish"
    }
  ];

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Interactive Demonstrations",
      description: "See encryption algorithms in action with real-time examples"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Educational Content",
      description: "Learn the mathematics and principles behind each algorithm"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Analysis",
      description: "Understand the strengths and weaknesses of different methods"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Best Practices",
      description: "Learn when and how to use each encryption method"
    }
  ];

  // Add proper type annotation for the algo parameter
  const AlgorithmCard = ({ algo }: { algo: Algorithm }) => (
    <Link href={algo.href} key={algo.name}>
      <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 cursor-pointer">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className={`p-3 rounded-lg ${algo.color} text-white`}>
              {algo.icon}
            </div>
            <Badge variant="secondary" className="bg-gray-700 text-gray-200">
              {algo.category}
            </Badge>
          </div>
          <CardTitle className="text-white">{algo.name}</CardTitle>
          <CardDescription className="text-gray-300">{algo.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-400">
            <div>
              <span className="font-medium">Key Size:</span> {algo.keySize}
            </div>
            <div>
              <span className="font-medium">Common Uses:</span> {algo.use}
            </div>
          </div>
          <Button className="w-full mt-4 bg-gray-700 hover:bg-gray-600">
            Learn {algo.name}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Explore Encryption Algorithms
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how different encryption algorithms work, from classic methods to modern standards.
            Learn the principles, see live demonstrations, and understand real-world applications.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/aes">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-gray-600 hover:bg-gray-800">
              Learn More
            </Button>
          </div>
        </div>

        {/* Algorithm Categories */}
        <Tabs defaultValue="all" className="w-full mt-16">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-800">
            <TabsTrigger value="all">All Algorithms</TabsTrigger>
            <TabsTrigger value="symmetric">Symmetric</TabsTrigger>
            <TabsTrigger value="asymmetric">Asymmetric</TabsTrigger>
            <TabsTrigger value="stream">Stream</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {algorithms.map((algo) => (
                <AlgorithmCard key={algo.name} algo={algo} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="symmetric">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {algorithms.filter(algo => algo.category === "Symmetric").map((algo) => (
                <AlgorithmCard key={algo.name} algo={algo} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="asymmetric">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {algorithms.filter(algo => algo.category === "Asymmetric").map((algo) => (
                <AlgorithmCard key={algo.name} algo={algo} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="stream">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {algorithms.filter(algo => algo.category === "Stream").map((algo) => (
                <AlgorithmCard key={algo.name} algo={algo} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Features Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-center mb-12">Why Learn Encryption?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-800 p-4 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Cryptography Journey?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Begin exploring encryption algorithms with hands-on demonstrations and in-depth tutorials.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/aes">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                Start Learning
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptionHomepage;