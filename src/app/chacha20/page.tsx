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
  Mail,
  Zap,
  Cpu,
  Clock
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

const ChaCha20Page = () => {
  const [inputText, setInputText] = useState('');
  const [key, setKey] = useState('');
  const [nonce, setNonce] = useState('');
  const [outputText, setOutputText] = useState('');
  const [counter, setCounter] = useState('1');
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [keyMode, setKeyMode] = useState<'generate' | 'manual'>('generate');

  const processText = async () => {
    if (!inputText.trim() || !key.trim() || !nonce.trim()) {
      return;
    }

    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (isEncrypting) {
      // In a real app, this would be actual ChaCha20 encryption
      const encrypted = btoa(inputText + '|' + key.slice(0, 10) + '|' + nonce.slice(0, 6) + '|' + counter);
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

  const generateKeyAndNonce = async () => {
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock key and nonce generation - in a real app, use a proper CSPRNG
    const mockKey = '0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF';
    const mockNonce = '0123456789ABCDEF';
    
    setKey(mockKey);
    setNonce(mockNonce);
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
      icon: <Zap className="w-5 h-5" />,
      title: "High Performance",
      description: "Designed for software efficiency, faster than AES on many platforms"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Strong Security",
      description: "No practical attacks against the full ChaCha20 algorithm"
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: "Hardware Friendly",
      description: "Performs well without specialized hardware acceleration"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Simple Design",
      description: "Based on ARX (add-rotate-XOR) operations for easy implementation"
    }
  ];

  const specifications = [
    { label: "Algorithm Type", value: "Stream Cipher" },
    { label: "Key Size", value: "256 bits (32 bytes)" },
    { label: "Nonce Size", value: "96 bits (12 bytes)" },
    { label: "Counter Size", value: "32 bits (4 bytes)" },
    { label: "Block Size", value: "512 bits (64 bytes)" },
    { label: "Rounds", value: "20 (ChaCha20) or 12 (ChaCha12) or 8 (ChaCha8)" }
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
                <Lock className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold">ChaCha20 Encryption</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ChaCha20 is a high-speed stream cipher designed by Daniel J. Bernstein. It's widely used in
              TLS, IETF protocols, and as part of the ChaCha20-Poly1305 authenticated encryption scheme.
            </p>
          </div>

          {/* Key Management Section */}
          <Card className="bg-gray-800 border-gray-700 mb-6 sm:mb-8">
            <CardHeader>
              <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4">
                <div>
                  <CardTitle className="text-white">ChaCha20 Key & Nonce</CardTitle>
                  <CardDescription className="text-gray-300">
                    Generate or provide your encryption key and nonce (initialization vector)
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button 
                    onClick={() => setKeyMode('generate')}
                    variant={keyMode === 'generate' ? 'default' : 'outline'}
                    className={`flex-1 sm:flex-none ${keyMode === 'generate' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 hover:bg-gray-700'}`}
                  >
                    Generate Values
                  </Button>
                  <Button 
                    onClick={() => setKeyMode('manual')}
                    variant={keyMode === 'manual' ? 'default' : 'outline'}
                    className={`flex-1 sm:flex-none ${keyMode === 'manual' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 hover:bg-gray-700'}`}
                  >
                    Provide Values
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {keyMode === 'generate' ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1">
                      <Label className="text-gray-300">Counter Start Value</Label>
                      <Select value={counter} onValueChange={setCounter}>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="0">0 (Not recommended)</SelectItem>
                          <SelectItem value="1">1 (Standard)</SelectItem>
                          <SelectItem value="random">Random (High Security)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="sm:pt-6">
                      <Button 
                        onClick={generateKeyAndNonce}
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
                            Generate Values
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {key && nonce && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Key (256 bits / 32 bytes, hex format)</Label>
                        <div className="relative">
                          <textarea
                            value={key}
                            readOnly
                            className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white resize-none text-sm font-mono"
                          />
                          <Button
                            onClick={() => copyToClipboard(key)}
                            size="sm"
                            className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600"
                          >
                            {copied ? <CheckCircle className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-gray-300">Nonce (96 bits / 12 bytes, hex format)</Label>
                        <div className="relative">
                          <textarea
                            value={nonce}
                            readOnly
                            className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white resize-none text-sm font-mono"
                          />
                          <Button
                            onClick={() => copyToClipboard(nonce)}
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
                    <Label className="text-gray-300">Key (256 bits / 32 bytes, hex format)</Label>
                    <textarea
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white resize-none text-sm font-mono"
                      placeholder="Enter 32-byte (64 hex character) key..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-gray-300">Nonce (96 bits / 12 bytes, hex format)</Label>
                    <textarea
                      value={nonce}
                      onChange={(e) => setNonce(e.target.value)}
                      className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white resize-none text-sm font-mono"
                      placeholder="Enter 12-byte (24 hex character) nonce..."
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
                  <CardTitle className="text-white">Try ChaCha20 Encryption</CardTitle>
                  <CardDescription className="text-gray-300">
                    {isEncrypting ? 'Encrypt data with your key and nonce' : 'Decrypt data with your key and nonce'}
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
                disabled={isProcessing || !inputText.trim() || !key.trim() || !nonce.trim()}
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
                  Nonces should never be reused with the same key, and secure random generators should be used for keys.
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
                    <CardTitle className="text-white">ChaCha State and Operations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                        <div>
                          <h3 className="font-semibold text-white">State Initialization</h3>
                          <p className="text-gray-400">4×4 matrix of 32-bit words with constants, key, counter, and nonce</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                        <div>
                          <h3 className="font-semibold text-white">Quarter Round Function</h3>
                          <p className="text-gray-400">ARX operations (add, rotate, XOR) applied to four words</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                        <div>
                          <h3 className="font-semibold text-white">Column and Diagonal Rounds</h3>
                          <p className="text-gray-400">Quarter rounds applied to columns, then diagonals of state matrix</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">4</div>
                        <div>
                          <h3 className="font-semibold text-white">Keystream Generation</h3>
                          <p className="text-gray-400">Final state XORed with initial state to produce 64-byte keystream block</p>
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
                        <p className="text-gray-400 text-sm">1. Initialize state with key, nonce, counter</p>
                        <p className="text-gray-400 text-sm">2. Apply 20 rounds (10 column, 10 diagonal)</p>
                        <p className="text-gray-400 text-sm">3. Generate keystream block</p>
                        <p className="text-gray-400 text-sm">4. XOR plaintext with keystream</p>
                        <p className="text-gray-400 text-sm">5. Increment counter for next block</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-4">Decryption</h3>
                      <div className="space-y-2">
                        <p className="text-gray-400 text-sm">1. Initialize state with same key, nonce, counter</p>
                        <p className="text-gray-400 text-sm">2. Generate identical keystream</p>
                        <p className="text-gray-400 text-sm">3. XOR ciphertext with keystream</p>
                        <p className="text-gray-400 text-sm">4. Recover plaintext (XOR is reversible)</p>
                        <p className="text-gray-400 text-sm">5. Continue with next counter value</p>
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
                        <span className="text-gray-300">TLS 1.3 and HTTPS connections</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">WireGuard VPN protocol</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Signal Protocol (with Poly1305)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">SSH connections</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Mobile device encryption</span>
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
                        <h4 className="font-medium text-white">Nonce Management</h4>
                        <p className="text-gray-400 text-sm">Never reuse a nonce with the same key; use counter or random nonces</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Authenticated Encryption</h4>
                        <p className="text-gray-400 text-sm">Use with Poly1305 for authentication (ChaCha20-Poly1305)</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Performance Benefits</h4>
                        <p className="text-gray-400 text-sm">Faster than AES on platforms without AES-NI hardware acceleration</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">State Security</h4>
                        <p className="text-gray-400 text-sm">More resistant to timing attacks than table-based ciphers like AES</p>
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
                    Code examples for implementing ChaCha20 in different programming languages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="javascript" className="w-full">
                    <TabsList className="mb-4 bg-gray-900">
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="rust">Rust</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="javascript">
                      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <code className="text-gray-300">{`// Using Node.js crypto module
const crypto = require('crypto');

// Key must be 32 bytes (256 bits)
const key = crypto.randomBytes(32);
// Nonce must be 12 bytes (96 bits) for IETF ChaCha20
const nonce = crypto.randomBytes(12);

// Encrypt function
function encryptChaCha20(plaintext, key, nonce) {
  const cipher = crypto.createCipheriv('chacha20', key, nonce);
  return Buffer.concat([
    cipher.update(plaintext),
    cipher.final()
  ]);
}

// Decrypt function
function decryptChaCha20(ciphertext, key, nonce) {
  const decipher = crypto.createDecipheriv('chacha20', key, nonce);
  return Buffer.concat([
    decipher.update(ciphertext),
    decipher.final()
  ]);
}

// Example usage
const message = 'Hello, ChaCha20!';
const encrypted = encryptChaCha20(Buffer.from(message), key, nonce);
const decrypted = decryptChaCha20(encrypted, key, nonce);

console.log('Original:', message);
console.log('Encrypted:', encrypted.toString('hex'));
console.log('Decrypted:', decrypted.toString());`}</code>
                      </pre>
                    </TabsContent>
                    
                    <TabsContent value="python">
                      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <code className="text-gray-300">{`# Using PyCryptodome library
from Crypto.Cipher import ChaCha20
import os

# Key must be 32 bytes (256 bits)
key = os.urandom(32)
# Nonce must be 12 bytes (96 bits) for IETF ChaCha20
nonce = os.urandom(12)

# Encrypt function
def encrypt_chacha20(plaintext, key, nonce):
    cipher = ChaCha20.new(key=key, nonce=nonce)
    return cipher.nonce + cipher.encrypt(plaintext)

# Decrypt function
def decrypt_chacha20(ciphertext, key):
    nonce = ciphertext[:12]
    ciphertext = ciphertext[12:]
    cipher = ChaCha20.new(key=key, nonce=nonce)
    return cipher.decrypt(ciphertext)

# Example usage
message = b"Hello, ChaCha20!"
encrypted = encrypt_chacha20(message, key, nonce)
decrypted = decrypt_chacha20(encrypted, key)

print("Original:", message.decode())
print("Encrypted:", encrypted.hex())
print("Decrypted:", decrypted.decode())`}</code>
                      </pre>
                    </TabsContent>
                    
                    <TabsContent value="rust">
                      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <code className="text-gray-300">{`// Using chacha20 crate in Rust
use chacha20poly1305::{ChaCha20, Key, Nonce};
use chacha20poly1305::aead::{NewCipher, StreamCipher};
use rand::{RngCore, rngs::OsRng};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Generate a random key (32 bytes)
    let mut key_bytes = [0u8; 32];
    OsRng.fill_bytes(&mut key_bytes);
    let key = Key::from_slice(&key_bytes);

    // Generate a random nonce (12 bytes)
    let mut nonce_bytes = [0u8; 12];
    OsRng.fill_bytes(&mut nonce_bytes);
    let nonce = Nonce::from_slice(&nonce_bytes);

    // Create a new ChaCha20 cipher instance
    let mut cipher = ChaCha20::new(key, nonce);
    
    // Our plaintext
    let message = b"Hello, ChaCha20!";
    let mut buffer = message.to_vec();
    
    // Encrypt in place
    cipher.apply_keystream(&mut buffer);
    println!("Encrypted: {:?}", buffer);
    
    // Create a new cipher instance with the same key and nonce for decryption
    let mut cipher = ChaCha20::new(key, nonce);
    
    // Decrypt in place
    cipher.apply_keystream(&mut buffer);
    println!("Decrypted: {}", String::from_utf8_lossy(&buffer));
    
    Ok(())
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

export default ChaCha20Page;