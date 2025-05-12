"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Key,
  Shield,
  Unlock,
  Lock,
  ClipboardCopy,
  CheckCircle,
  AlertTriangle,
  Shuffle,
  RefreshCw,
  HardDrive,
  Wifi,
  Database,
  Mail
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
    className={`w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
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

const RSAPage = () => {
  const [inputText, setInputText] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [outputText, setOutputText] = useState('');
  const [keySize, setKeySize] = useState('2048');
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
      const encrypted = btoa(inputText + '|' + keyToUse + '|' + keySize);
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
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3...
-----END PUBLIC KEY-----`;
    
    const mockPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAo...
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
      icon: <Key className="w-5 h-5" />,
      title: "Public Key Cryptography",
      description: "Uses mathematically related key pairs for secure communication"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Digital Signatures",
      description: "Provides authentication and non-repudiation"
    },
    {
      icon: <Shuffle className="w-5 h-5" />,
      title: "Key Exchange",
      description: "Secure distribution of symmetric keys"
    },
    {
      icon: <HardDrive className="w-5 h-5" />,
      title: "Hybrid Encryption",
      description: "Combined with symmetric algorithms for efficiency"
    }
  ];

  const specifications = [
    { label: "Algorithm Type", value: "Asymmetric Cipher" },
    { label: "Key Sizes", value: "1024, 2048, 3072, 4096 bits" },
    { label: "Security Basis", value: "Integer Factorization" },
    { label: "Speed", value: "Slower than symmetric (RSA vs AES: ~100x)" },
    { label: "Key Management", value: "Public Key Infrastructure (PKI)" },
    { label: "Quantum Resistance", value: "Vulnerable to Shor's algorithm" }
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
              <div className="p-3 bg-orange-600 rounded-lg">
                <Key className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold">RSA Encryption</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              RSA (Rivest-Shamir-Adleman) is one of the first public-key cryptosystems and is widely 
              used for secure data transmission. It uses a pair of keys: a public key for encryption 
              and a private key for decryption.
            </p>
          </div>

          {/* Key Management Section */}
          <Card className="bg-gray-800 border-gray-700 mb-6 sm:mb-8">
            <CardHeader>
              <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4">
                <div>
                  <CardTitle className="text-white">RSA Key Management</CardTitle>
                  <CardDescription className="text-gray-300">
                    Generate a new key pair or provide your own keys
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button 
                    onClick={() => setKeyMode('generate')}
                    variant={keyMode === 'generate' ? 'default' : 'outline'}
                    className={`flex-1 sm:flex-none ${keyMode === 'generate' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 hover:bg-gray-700'}`}
                  >
                    Generate Keys
                  </Button>
                  <Button 
                    onClick={() => setKeyMode('manual')}
                    variant={keyMode === 'manual' ? 'default' : 'outline'}
                    className={`flex-1 sm:flex-none ${keyMode === 'manual' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 hover:bg-gray-700'}`}
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
                      <Label className="text-gray-300">Key Size</Label>
                      <Select value={keySize} onValueChange={setKeySize}>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="1024">1024 bits (Not recommended)</SelectItem>
                          <SelectItem value="2048">2048 bits (Standard)</SelectItem>
                          <SelectItem value="3072">3072 bits (High Security)</SelectItem>
                          <SelectItem value="4096">4096 bits (Maximum Security)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="pt-6">
                      <Button 
                        onClick={generateKeyPair}
                        className="bg-orange-600 hover:bg-orange-700"
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
                  <CardTitle className="text-white">Try RSA Encryption</CardTitle>
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
                    className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                className="w-full bg-orange-600 hover:bg-orange-700"
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
                  Never share private keys and always use key sizes of 2048 bits or larger.
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
                      <div className="bg-orange-600 p-2 rounded">
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
                    <CardTitle className="text-white">RSA Key Generation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                        <div>
                          <h3 className="font-semibold text-white">Generate Two Large Primes</h3>
                          <p className="text-gray-400">Choose two distinct large prime numbers p and q</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                        <div>
                          <h3 className="font-semibold text-white">Compute n = p × q</h3>
                          <p className="text-gray-400">This will be the modulus for both keys</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                        <div>
                          <h3 className="font-semibold text-white">Choose Public Exponent e</h3>
                          <p className="text-gray-400">Common values are 3, 5, 17, 257, or 65537</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">4</div>
                        <div>
                          <h3 className="font-semibold text-white">Compute Private Exponent d</h3>
                          <p className="text-gray-400">Find d such that d × e ≡ 1 (mod φ(n))</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Encryption/Decryption Process</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-white mb-4">Encryption</h3>
                      <div className="space-y-2">
                        <p className="text-gray-400 text-sm">1. Convert message to integer m</p>
                        <p className="text-gray-400 text-sm">2. Compute c = m^e mod n</p>
                        <p className="text-gray-400 text-sm">3. Send ciphertext c</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-4">Decryption</h3>
                      <div className="space-y-2">
                        <p className="text-gray-400 text-sm">1. Receive ciphertext c</p>
                        <p className="text-gray-400 text-sm">2. Compute m = c^d mod n</p>
                        <p className="text-gray-400 text-sm">3. Convert m back to message</p>
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
                        <Wifi className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">HTTPS/SSL certificates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Email encryption (PGP/GPG)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Digital signatures</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">SSH/SFTP connections</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">VPN protocols</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Key Considerations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-white">Minimum Key Size</h4>
                        <p className="text-gray-400 text-sm">2048 bits for new applications, 3072+ bits for long-term security</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Performance</h4>
                        <p className="text-gray-400 text-sm">Slower than symmetric encryption, typically used in hybrid systems</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Key Management</h4>
                        <p className="text-gray-400 text-sm">Requires secure distribution of public keys via PKI</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Quantum Threat</h4>
                        <p className="text-gray-400 text-sm">Vulnerable to quantum computers, research ongoing for post-quantum alternatives</p>
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
                    Code examples for implementing RSA in different programming languages
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

// Generate RSA key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// Encrypt with public key
function encryptRSA(message, publicKey) {
  return crypto.publicEncrypt(publicKey, Buffer.from(message, 'utf8'));
}

// Decrypt with private key
function decryptRSA(encryptedData, privateKey) {
  return crypto.privateDecrypt(privateKey, encryptedData).toString('utf8');
}

// Example usage
const message = 'Hello, RSA!';
const encrypted = encryptRSA(message, publicKey);
const decrypted = decryptRSA(encrypted, privateKey);`}</code>
                      </pre>
                    </TabsContent>
                    
                    <TabsContent value="python">
                      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <code className="text-gray-300">{`# Using cryptography library
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes

# Generate RSA key pair
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048
)
public_key = private_key.public_key()

# Encrypt with public key
def encrypt_rsa(message, public_key):
    encrypted = public_key.encrypt(
        message.encode(),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return encrypted

# Decrypt with private key
def decrypt_rsa(encrypted_data, private_key):
    decrypted = private_key.decrypt(
        encrypted_data,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return decrypted.decode()

# Example usage
message = "Hello, RSA!"
encrypted = encrypt_rsa(message, public_key)
decrypted = decrypt_rsa(encrypted, private_key)`}</code>
                      </pre>
                    </TabsContent>
                    
                    <TabsContent value="java">
                      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <code className="text-gray-300">{`// Using Java Cryptography Extension
import javax.crypto.Cipher;
import java.security.*;

public class RSAEncryption {
    private static final String ALGORITHM = "RSA";
    
    // Generate RSA key pair
    public static KeyPair generateKeyPair() throws Exception {
        KeyPairGenerator generator = KeyPairGenerator.getInstance(ALGORITHM);
        generator.initialize(2048);
        return generator.generateKeyPair();
    }
    
    // Encrypt with public key
    public static byte[] encrypt(String data, PublicKey publicKey) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        return cipher.doFinal(data.getBytes());
    }
    
    // Decrypt with private key
    public static String decrypt(byte[] encryptedData, PrivateKey privateKey) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        return new String(cipher.doFinal(encryptedData));
    }
    
    // Example usage
    public static void main(String[] args) throws Exception {
        KeyPair keyPair = generateKeyPair();
        PublicKey publicKey = keyPair.getPublic();
        PrivateKey privateKey = keyPair.getPrivate();
        
        String message = "Hello, RSA!";
        byte[] encrypted = encrypt(message, publicKey);
        String decrypted = decrypt(encrypted, privateKey);
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

export default RSAPage;