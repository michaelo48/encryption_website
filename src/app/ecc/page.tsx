"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Cpu,
  Key,
  Shield,
  Unlock,
  Lock,
  ClipboardCopy,
  CheckCircle,
  AlertTriangle,
  Shuffle,
  RefreshCw,
  Smartphone,
  Wifi,
  Bluetooth,
  Globe
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Custom component types
interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children, className = '' }) => (
  <label className={`block text-sm font-medium ${className}`}>
    {children}
  </label>
);

interface SelectProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const Select: React.FC<SelectProps> = ({ children, value, onValueChange, className = '' }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className={`w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
  >
    {children}
  </select>
);

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => (
  <option value={value}>{children}</option>
);

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

const SelectContent: React.FC<SelectContentProps> = ({ children }) => <>{children}</>;

interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ children, className = '' }) => (
  <div className={`p-4 rounded-md border ${className}`}>
    {children}
  </div>
);

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const AlertDescription: React.FC<AlertDescriptionProps> = ({ children, className = '' }) => (
  <div className={`text-sm ${className}`}>
    {children}
  </div>
);

const ECCPage = () => {
  const [inputText, setInputText] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [outputText, setOutputText] = useState('');
  const [curve, setCurve] = useState('P-256');
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [keyMode, setKeyMode] = useState<'generate' | 'manual'>('generate');

  const processText = async () => {
    if (!inputText.trim() || (!publicKey.trim() && !privateKey.trim())) {
      return;
    }

    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (isEncrypting) {
      const keyToUse = publicKey || 'mock-public-key';
      const encrypted = btoa(inputText + '|' + keyToUse + '|' + curve);
      setOutputText(encrypted);
    } else {
      try {
        const decoded = atob(inputText);
        const parts = decoded.split('|');
        setOutputText(parts[0] || 'Invalid encrypted text');
      } catch {
        setOutputText('Invalid encrypted text');
      }
    }
    
    setIsProcessing(false);
  };

  const generateKeyPair = async () => {
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockPublicKey = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE3P+QCE1LzR4TF...
-----END PUBLIC KEY-----`;
    
    const mockPrivateKey = `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg...
-----END PRIVATE KEY-----`;
    
    setPublicKey(mockPublicKey);
    setPrivateKey(mockPrivateKey);
    setIsProcessing(false);
  };

  const copyToClipboard = async (text: string) => {
    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const switchMode = () => {
    setIsEncrypting(!isEncrypting);
    setInputText('');
    setOutputText('');
  };

  const features = [
    {
      icon: <Cpu className="w-5 h-5" />,
      title: "Smaller Keys",
      description: "256-bit ECC key offers same security as 3072-bit RSA"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Strong Security",
      description: "Based on discrete logarithm problem over elliptic curves"
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile Optimized",
      description: "Lower computational requirements ideal for IoT and mobile"
    },
    {
      icon: <Shuffle className="w-5 h-5" />,
      title: "Key Exchange",
      description: "Efficient ECDH for secure key establishment"
    }
  ];

  const specifications = [
    { label: "Algorithm Type", value: "Asymmetric Cipher" },
    { label: "Popular Curves", value: "P-256, P-384, P-521, secp256k1" },
    { label: "Key Sizes", value: "192, 224, 256, 384, 521 bits" },
    { label: "Security Basis", value: "Elliptic Curve Discrete Logarithm" },
    { label: "Efficiency", value: "80% smaller keys than RSA for same security" },
    { label: "Standards", value: "NIST, SEC, Brainpool curves" }
  ];

  return (
    <>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <Link href="/">
              <Button variant="ghost" className="hover:bg-gray-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Algorithms
              </Button>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 px-2 sm:px-0">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-600 rounded-lg">
                <Cpu className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold">ECC Encryption</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Elliptic Curve Cryptography (ECC) is a public-key cryptosystem that offers the same 
              security as RSA with significantly smaller key sizes, making it ideal for mobile 
              devices and IoT applications.
            </p>
          </div>

          {/* Key Management Section */}
          <Card className="bg-gray-800 border-gray-700 mb-6 sm:mb-8">
            <CardHeader>
              <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4">
                <div>
                  <CardTitle className="text-white">ECC Key Management</CardTitle>
                  <CardDescription className="text-gray-300">
                    Generate a new key pair or provide your own keys
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button 
                    onClick={() => setKeyMode('generate')}
                    variant={keyMode === 'generate' ? 'default' : 'outline'}
                    className={`flex-1 sm:flex-none ${keyMode === 'generate' ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-600 hover:bg-gray-700'}`}
                  >
                    Generate Keys
                  </Button>
                  <Button 
                    onClick={() => setKeyMode('manual')}
                    variant={keyMode === 'manual' ? 'default' : 'outline'}
                    className={`flex-1 sm:flex-none ${keyMode === 'manual' ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-600 hover:bg-gray-700'}`}
                  >
                    Provide Keys
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {keyMode === 'generate' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label className="text-gray-300">Elliptic Curve</Label>
                      <Select value={curve} onValueChange={setCurve}>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="P-256">P-256 (secp256r1)</SelectItem>
                          <SelectItem value="P-384">P-384 (secp384r1)</SelectItem>
                          <SelectItem value="P-521">P-521 (secp521r1)</SelectItem>
                          <SelectItem value="secp256k1">secp256k1 (Bitcoin)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="pt-6">
                      <Button 
                        onClick={generateKeyPair}
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Key className="w-4 h-4 mr-2" />
                            Generate Key Pair
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {publicKey && privateKey && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Public Key</Label>
                        <div className="relative">
                          <textarea
                            value={publicKey}
                            readOnly
                            className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white resize-none text-sm font-mono"
                          />
                          <Button
                            onClick={() => copyToClipboard(publicKey)}
                            size="sm"
                            className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600"
                          >
                            {copied ? <CheckCircle className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-gray-300">Private Key</Label>
                        <div className="relative">
                          <textarea
                            value={privateKey}
                            readOnly
                            className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white resize-none text-sm font-mono"
                          />
                          <Button
                            onClick={() => copyToClipboard(privateKey)}
                            size="sm"
                            className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600"
                          >
                            {copied ? <CheckCircle className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Public Key</Label>
                    <textarea
                      value={publicKey}
                      onChange={(e) => setPublicKey(e.target.value)}
                      className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white resize-none text-sm font-mono"
                      placeholder="-----BEGIN PUBLIC KEY-----&#10;(paste your public key here)&#10;-----END PUBLIC KEY-----"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-gray-300">Private Key</Label>
                    <textarea
                      value={privateKey}
                      onChange={(e) => setPrivateKey(e.target.value)}
                      className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white resize-none text-sm font-mono"
                      placeholder="-----BEGIN PRIVATE KEY-----&#10;(paste your private key here)&#10;-----END PRIVATE KEY-----"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interactive Demo Section */}
          <Card className="bg-gray-800 border-gray-700 mb-8 sm:mb-12">
            <CardHeader>
              <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4">
                <div>
                  <CardTitle className="text-white">Try ECC Encryption</CardTitle>
                  <CardDescription className="text-gray-300">
                    {isEncrypting ? 'Encrypt with public key, decrypt with private key' : 'Use private key to decrypt'}
                  </CardDescription>
                </div>
                <Button 
                  onClick={switchMode}
                  variant="outline" 
                  className="border-gray-600 hover:bg-gray-700 w-full sm:w-auto"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{isEncrypting ? 'Switch to Decrypt' : 'Switch to Encrypt'}</span>
                  <span className="sm:hidden">{isEncrypting ? 'Decrypt' : 'Encrypt'}</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">
                    {isEncrypting ? 'Plain Text' : 'Encrypted Text'}
                  </Label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={isEncrypting ? "Enter text to encrypt..." : "Enter encrypted text..."}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-300">
                    {isEncrypting ? 'Encrypted Result' : 'Decrypted Result'}
                  </Label>
                  <div className="relative">
                    <textarea
                      value={outputText}
                      readOnly
                      className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white resize-none"
                      placeholder="Result will appear here..."
                    />
                    {outputText && (
                      <Button
                        onClick={() => copyToClipboard(outputText)}
                        size="sm"
                        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600"
                      >
                        {copied ? <CheckCircle className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                onClick={processText}
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isProcessing || !inputText.trim() || (isEncrypting ? !publicKey.trim() : !privateKey.trim())}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {isEncrypting ? <Lock className="w-4 h-4 mr-2" /> : <Unlock className="w-4 h-4 mr-2" />}
                    {isEncrypting ? 'Encrypt Text' : 'Decrypt Text'}
                  </>
                )}
              </Button>

              <Alert className="bg-gray-900 border-gray-700">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-gray-300">
                  This is a demonstration only. For production use, please use a proper cryptographic library. 
                  Never share private keys and always use recommended curves like P-256 or P-384.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Information Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full flex bg-gray-800 mb-8">
              <TabsTrigger value="overview" className="flex-1 px-3 py-2">
                <span className="hidden sm:inline">Overview</span>
                <span className="sm:hidden text-sm">Info</span>
              </TabsTrigger>
              <TabsTrigger value="how-it-works" className="flex-1 px-3 py-2">
                <span className="hidden sm:inline">How It Works</span>
                <span className="sm:hidden text-sm">Process</span>
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex-1 px-3 py-2">
                <span className="hidden sm:inline">Applications</span>
                <span className="sm:hidden text-sm">Apps</span>
              </TabsTrigger>
              <TabsTrigger value="implementation" className="flex-1 px-3 py-2">
                <span className="hidden sm:inline">Implementation</span>
                <span className="sm:hidden text-sm">Code</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <Card key={index} className="bg-gray-800 border-gray-700">
                    <CardContent className="flex items-start gap-4 p-4 sm:p-6">
                      <div className="bg-purple-600 p-2 rounded">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{feature.title}</h3>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0">
                        <span className="text-gray-400">{spec.label}</span>
                        <span className="text-white font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="how-it-works">
              <div className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Elliptic Curve Mathematics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                        <div>
                          <h3 className="font-semibold text-white">Curve Definition</h3>
                          <p className="text-gray-400">y² = x³ + ax + b (mod p) for prime curves</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                        <div>
                          <h3 className="font-semibold text-white">Point Addition</h3>
                          <p className="text-gray-400">Add two points on the curve to get a third point</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                        <div>
                          <h3 className="font-semibold text-white">Scalar Multiplication</h3>
                          <p className="text-gray-400">k × P = P + P + ... + P (k times)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">4</div>
                        <div>
                          <h3 className="font-semibold text-white">Discrete Logarithm</h3>
                          <p className="text-gray-400">Finding k given k×P is computationally hard</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">ECC Operations</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-white mb-4">ECDH Key Exchange</h3>
                      <div className="space-y-2">
                        <p className="text-gray-400 text-sm">1. Alice generates k_A, publishes k_A×G</p>
                        <p className="text-gray-400 text-sm">2. Bob generates k_B, publishes k_B×G</p>
                        <p className="text-gray-400 text-sm">3. Shared secret: k_A×(k_B×G) = k_B×(k_A×G)</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-4">ECDSA Signatures</h3>
                      <div className="space-y-2">
                        <p className="text-gray-400 text-sm">1. Generate ephemeral key pair (k, k×G)</p>
                        <p className="text-gray-400 text-sm">2. Calculate r = (k×G).x mod n</p>
                        <p className="text-gray-400 text-sm">3. Calculate s = k⁻¹(h(m) + d×r) mod n</p>
                        <p className="text-gray-400 text-sm">4. Signature is (r, s)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="applications">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Common Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Mobile device security</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Bluetooth className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Bluetooth and IoT devices</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">TLS/SSL certificates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Wi-Fi WPA3 security</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Digital signatures</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Curve Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-white">P-256 (secp256r1)</h4>
                        <p className="text-gray-400 text-sm">NIST standard, widely supported, 128-bit security</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">P-384 (secp384r1)</h4>
                        <p className="text-gray-400 text-sm">Higher security, 192-bit equivalent, Suite B approved</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">P-521 (secp521r1)</h4>
                        <p className="text-gray-400 text-sm">Maximum NIST standard, 256-bit security equivalent</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">secp256k1</h4>
                        <p className="text-gray-400 text-sm">Used by Bitcoin, optimized for signatures</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="implementation">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Implementation Examples</CardTitle>
                  <CardDescription className="text-gray-300">
                    Code examples for implementing ECC in different programming languages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="javascript" className="w-full">
                    <TabsList className="mb-4 bg-gray-900">
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="java">Java</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="javascript">
                      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <code className="text-gray-300">{`// Using crypto module (Node.js)
const crypto = require('crypto');

// Generate ECC key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
  namedCurve: 'prime256v1', // P-256
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// ECDH key exchange
const aliceKeys = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
const bobKeys = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' });

const aliceDH = crypto.createECDH('prime256v1');
const bobDH = crypto.createECDH('prime256v1');

aliceDH.setPrivateKey(aliceKeys.privateKey);
bobDH.setPrivateKey(bobKeys.privateKey);

const aliceSecret = aliceDH.computeSecret(bobKeys.publicKey);
const bobSecret = bobDH.computeSecret(aliceKeys.publicKey);

// aliceSecret === bobSecret

// ECDSA signing
const sign = crypto.createSign('SHA256');
sign.update('some data');
const signature = sign.sign(privateKey);

// ECDSA verification
const verify = crypto.createVerify('SHA256');
verify.update('some data');
const isValid = verify.verify(publicKey, signature);`}</code>
                      </pre>
                    </TabsContent>
                    
                    <TabsContent value="python">
                      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <code className="text-gray-300">{`# Using cryptography library
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import utils

# Generate ECC key pair
private_key = ec.generate_private_key(
    ec.SECP256R1()  # P-256 curve
)
public_key = private_key.public_key()

# ECDH key exchange
other_private_key = ec.generate_private_key(ec.SECP256R1())
other_public_key = other_private_key.public_key()

shared_secret = private_key.exchange(ec.ECDH(), other_public_key)

# ECDSA signing
message = b"Hello, ECC!"
signature = private_key.sign(
    message,
    ec.ECDSA(hashes.SHA256())
)

# ECDSA verification
try:
    public_key.verify(
        signature,
        message,
        ec.ECDSA(hashes.SHA256())
    )
    print("Signature is valid")
except:
    print("Signature is invalid")`}</code>
                      </pre>
                    </TabsContent>
                    
                    <TabsContent value="java">
                      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <code className="text-gray-300">{`// Using Java Cryptography Extension
import java.security.*;
import java.security.spec.*;
import javax.crypto.*;

public class ECCEncryption {
    private static final String ALGORITHM = "EC";
    private static final String CURVE = "secp256r1";
    
    // Generate ECC key pair
    public static KeyPair generateKeyPair() throws Exception {
        KeyPairGenerator generator = KeyPairGenerator.getInstance(ALGORITHM);
        ECGenParameterSpec ecsp = new ECGenParameterSpec(CURVE);
        generator.initialize(ecsp);
        return generator.generateKeyPair();
    }
    
    // ECDH key exchange
    public static byte[] performECDH(PrivateKey privateKey, PublicKey publicKey) throws Exception {
        KeyAgreement ka = KeyAgreement.getInstance("ECDH");
        ka.init(privateKey);
        ka.doPhase(publicKey, true);
        return ka.generateSecret();
    }
    
    // ECDSA signing
    public static byte[] sign(String data, PrivateKey privateKey) throws Exception {
        Signature signature = Signature.getInstance("SHA256withECDSA");
        signature.initSign(privateKey);
        signature.update(data.getBytes());
        return signature.sign();
    }
    
    // ECDSA verification
    public static boolean verify(String data, byte[] signatureBytes, PublicKey publicKey) throws Exception {
        Signature signature = Signature.getInstance("SHA256withECDSA");
        signature.initVerify(publicKey);
        signature.update(data.getBytes());
        return signature.verify(signatureBytes);
    }
    
    // Example usage
    public static void main(String[] args) throws Exception {
        KeyPair keyPair = generateKeyPair();
        PrivateKey privateKey = keyPair.getPrivate();
        PublicKey publicKey = keyPair.getPublic();
        
        String message = "Hello, ECC!";
        byte[] signature = sign(message, privateKey);
        boolean isValid = verify(message, signature, publicKey);
    }
}`}</code>
                      </pre>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ECCPage;