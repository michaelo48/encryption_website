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
  Lock as LockIcon,
  Clock,
  FileCode,
  Layers
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
    className={`w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${className}`}
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

const TwofishPage = () => {
  const [inputText, setInputText] = useState('');
  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');
  const [outputText, setOutputText] = useState('');
  const [keySize, setKeySize] = useState('256');
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [keyMode, setKeyMode] = useState<'generate' | 'manual'>('generate');
  const [blockMode, setBlockMode] = useState('cbc');
  
  // Validation states
  const [keyError, setKeyError] = useState('');
  const [ivError, setIvError] = useState('');
  const [inputError, setInputError] = useState('');

  // Validation functions
  const validateKey = (keyValue: string) => {
    // Key should be 16, 24, or 32 bytes depending on key size
    if (!keyValue.trim()) {
      setKeyError('Key is required');
      return false;
    }
    
    // If in manual mode, validate the key format
    if (keyMode === 'manual') {
      // Check if key is a valid hex string
      const hexRegex = /^[0-9A-Fa-f]*$/;
      if (!hexRegex.test(keyValue)) {
        setKeyError('Key must contain only hexadecimal characters (0-9, A-F)');
        return false;
      }
      
      const requiredLength = parseInt(keySize) / 4; // Convert bits to hex characters
      if (keyValue.length !== requiredLength) {
        setKeyError(`Key must be exactly ${requiredLength/2} bytes (${requiredLength} hex characters) for ${keySize}-bit encryption. Current length: ${keyValue.length}`);
        return false;
      }
    }
    
    setKeyError('');
    return true;
  };
  
  const validateIv = (ivValue: string) => {
    // IV should be 16 bytes (128 bits) for block ciphers
    if (!ivValue.trim()) {
      setIvError('Initialization Vector (IV) is required');
      return false;
    }
    
    // If in manual mode, validate the IV format
    if (keyMode === 'manual') {
      // Check if IV is a valid hex string
      const hexRegex = /^[0-9A-Fa-f]*$/;
      if (!hexRegex.test(ivValue)) {
        setIvError('IV must contain only hexadecimal characters (0-9, A-F)');
        return false;
      }
      
      if (ivValue.length !== 32) { // 16 bytes = 32 hex characters
        setIvError(`IV must be exactly 16 bytes (32 hex characters). Current length: ${ivValue.length}`);
        return false;
      }
    }
    
    setIvError('');
    return true;
  };
  
  const validateInput = (text: string) => {
    if (!text.trim()) {
      setInputError('Input text is required');
      return false;
    }
    
    // If decrypting, check if input is valid base64
    if (!isEncrypting) {
      try {
        atob(text);
      } catch {
        setInputError('Input must be a valid base64-encoded string for decryption');
        return false;
      }
    }
    
    setInputError('');
    return true;
  };
  
  // Validate all inputs before processing
  const validateAll = () => {
    const isKeyValid = validateKey(key);
    const isIvValid = validateIv(iv);
    const isInputValid = validateInput(inputText);
    
    return isKeyValid && isIvValid && isInputValid;
  };

  const processText = async () => {
    if (!validateAll()) {
      return;
    }

    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (isEncrypting) {
      // In a real app, this would be actual Twofish encryption
      const encrypted = btoa(inputText + '|' + key.slice(0, 10) + '|' + iv.slice(0, 6) + '|' + keySize + '|' + blockMode);
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

  const generateKeyAndIv = async () => {
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Set key length based on key size selection
    const keyLength = parseInt(keySize) / 4; // Convert bits to hex characters
    
    // Mock key and IV generation - in a real app, use a proper CSPRNG
    let mockKey = '';
    for (let i = 0; i < keyLength; i++) {
      mockKey += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
    }
    
    // IV is always 16 bytes (32 hex characters) for block ciphers
    let mockIv = '';
    for (let i = 0; i < 32; i++) {
      mockIv += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
    }
    
    setKey(mockKey);
    setIv(mockIv);
    
    // Clear any existing errors
    setKeyError('');
    setIvError('');
    
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
    
    // Clear validation errors
    setInputError('');
  };

  // Create a handler for key size changes
  const handleKeySizeChange = (size: string) => {
    setKeySize(size);
    
    // If in manual mode and key already exists, validate with new size
    if (keyMode === 'manual' && key) {
      validateKey(key);
    }
  };

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Strong Security",
      description: "No practical attacks on the full 16-round Twofish algorithm"
    },
    {
      icon: <Key className="w-5 h-5" />,
      title: "Flexible Key Length",
      description: "Supports 128, 192, and 256-bit keys for different security needs"
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Feistel Network",
      description: "Based on a Feistel network with pre-whitening and post-whitening"
    },
    {
      icon: <FileCode className="w-5 h-5" />,
      title: "Public Domain",
      description: "Unpatented and freely available for any use"
    }
  ];

  const specifications = [
    { label: "Algorithm Type", value: "Symmetric Block Cipher" },
    { label: "Block Size", value: "128 bits (16 bytes)" },
    { label: "Key Sizes", value: "128, 192, or 256 bits" },
    { label: "Structure", value: "16-round Feistel network" },
    { label: "S-boxes", value: "Key-dependent, bijective" },
    { label: "Year Published", value: "1998 (AES finalist)" }
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
              <div className="p-3 bg-teal-600 rounded-lg">
                <Key className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold">Twofish Encryption</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Twofish is a symmetric key block cipher designed by Bruce Schneier and others as a successor to Blowfish.
              It was a finalist in the Advanced Encryption Standard competition and offers strong security with flexible key sizes.
            </p>
          </div>

          {/* Key Management Section */}
          <Card className="bg-gray-800 border-gray-700 mb-6 sm:mb-8">
            <CardHeader>
              <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4">
                <div>
                  <CardTitle className="text-white">Twofish Key Management</CardTitle>
                  <CardDescription className="text-gray-300">
                    Generate or provide your encryption key and initialization vector (IV)
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button 
                    onClick={() => setKeyMode('generate')}
                    variant={keyMode === 'generate' ? 'default' : 'outline'}
                    className={`flex-1 sm:flex-none ${keyMode === 'generate' ? 'bg-teal-600 hover:bg-teal-700' : 'border-gray-600 hover:bg-gray-700'}`}
                  >
                    Generate Values
                  </Button>
                  <Button 
                    onClick={() => setKeyMode('manual')}
                    variant={keyMode === 'manual' ? 'default' : 'outline'}
                    className={`flex-1 sm:flex-none ${keyMode === 'manual' ? 'bg-teal-600 hover:bg-teal-700' : 'border-gray-600 hover:bg-gray-700'}`}
                  >
                    Provide Values
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {keyMode === 'generate' ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <Label className="text-gray-300">Key Size</Label>
                      <Select value={keySize} onValueChange={handleKeySizeChange}>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="128">128 bits (Standard)</SelectItem>
                          <SelectItem value="192">192 bits (Enhanced)</SelectItem>
                          <SelectItem value="256">256 bits (Maximum Security)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Label className="text-gray-300">Block Mode</Label>
                      <Select value={blockMode} onValueChange={setBlockMode}>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="ecb">ECB (Not recommended)</SelectItem>
                          <SelectItem value="cbc">CBC (Standard)</SelectItem>
                          <SelectItem value="ctr">CTR (Counter)</SelectItem>
                          <SelectItem value="gcm">GCM (Authenticated)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="pt-6 w-full sm:w-auto">
                      <Button 
                        onClick={generateKeyAndIv}
                        className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto"
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
                  
                  {key && iv && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Key ({keySize} bits, hex format)</Label>
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
                        <Label className="text-gray-300">Initialization Vector (128 bits, hex format)</Label>
                        <div className="relative">
                          <textarea
                            value={iv}
                            readOnly
                            className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white resize-none text-sm font-mono"
                          />
                          <Button
                            onClick={() => copyToClipboard(iv)}
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
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex-1">
                      <Label className="text-gray-300">Key Size</Label>
                      <Select value={keySize} onValueChange={handleKeySizeChange}>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="128">128 bits (16 bytes)</SelectItem>
                          <SelectItem value="192">192 bits (24 bytes)</SelectItem>
                          <SelectItem value="256">256 bits (32 bytes)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Label className="text-gray-300">Block Mode</Label>
                      <Select value={blockMode} onValueChange={setBlockMode}>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="ecb">ECB (Not recommended)</SelectItem>
                          <SelectItem value="cbc">CBC (Standard)</SelectItem>
                          <SelectItem value="ctr">CTR (Counter)</SelectItem>
                          <SelectItem value="gcm">GCM (Authenticated)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Key ({keySize} bits, hex format)</Label>
                      <textarea
                        value={key}
                        onChange={(e) => {
                          setKey(e.target.value);
                          validateKey(e.target.value);
                        }}
                        className={`w-full h-32 px-3 py-2 bg-gray-900 border ${keyError ? 'border-red-500' : 'border-gray-700'} rounded-md text-white resize-none text-sm font-mono focus:outline-none focus:ring-2 ${keyError ? 'focus:ring-red-500' : 'focus:ring-teal-500'}`}
                        placeholder={`Enter ${parseInt(keySize)/8}-byte (${parseInt(keySize)/4} hex character) key...`}
                      />
                      {keyError && (
                        <p className="text-red-500 text-sm mt-1">{keyError}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-300">Initialization Vector (128 bits, hex format)</Label>
                      <textarea
                        value={iv}
                        onChange={(e) => {
                          setIv(e.target.value);
                          validateIv(e.target.value);
                        }}
                        className={`w-full h-32 px-3 py-2 bg-gray-900 border ${ivError ? 'border-red-500' : 'border-gray-700'} rounded-md text-white resize-none text-sm font-mono focus:outline-none focus:ring-2 ${ivError ? 'focus:ring-red-500' : 'focus:ring-teal-500'}`}
                        placeholder="Enter 16-byte (32 hex character) IV..."
                      />
                      {ivError && (
                        <p className="text-red-500 text-sm mt-1">{ivError}</p>
                      )}
                    </div>
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
                  <CardTitle className="text-white">Try Twofish Encryption</CardTitle>
                  <CardDescription className="text-gray-300">
                    {isEncrypting ? 'Encrypt data with your key and IV' : 'Decrypt data with your key and IV'}
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
                    onChange={(e) => {
                      setInputText(e.target.value);
                      validateInput(e.target.value);
                    }}
                    className={`w-full h-32 px-3 py-2 bg-gray-900 border ${inputError ? 'border-red-500' : 'border-gray-700'} rounded-md text-white resize-none focus:outline-none focus:ring-2 ${inputError ? 'focus:ring-red-500' : 'focus:ring-teal-500'}`}
                    placeholder={isEncrypting ? "Enter text to encrypt..." : "Enter encrypted text..."}
                  />
                  {inputError && (
                    <p className="text-red-500 text-sm mt-1">{inputError}</p>
                  )}
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
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={isProcessing || !inputText.trim() || !key.trim() || !iv.trim()}
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
                  The security of Twofish depends on the mode of operation; ECB mode should never be used in practice.
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
                      <div className="bg-teal-600 p-2 rounded">
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
                    <CardTitle className="text-white">Twofish Algorithm Structure</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                        <div>
                          <h3 className="font-semibold text-white">Key Schedule</h3>
                          <p className="text-gray-400">The key is expanded into subkeys used in each round</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                        <div>
                          <h3 className="font-semibold text-white">Input Whitening</h3>
                          <p className="text-gray-400">Initial XOR operation with four subkeys before entering the rounds</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                        <div>
                          <h3 className="font-semibold text-white">Round Function</h3>
                          <p className="text-gray-400">16 rounds of a Feistel structure with key-dependent S-boxes</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">4</div>
                        <div>
                          <h3 className="font-semibold text-white">Output Whitening</h3>
                          <p className="text-gray-400">Final XOR operation with four more subkeys to produce ciphertext</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Key Features of Twofish Design</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-white mb-4">Key-Dependent S-boxes</h3>
                      <div className="space-y-2">
                        <p className="text-gray-400 text-sm">1. S-boxes are generated from the key</p>
                        <p className="text-gray-400 text-sm">2. Makes cryptanalysis more difficult</p>
                        <p className="text-gray-400 text-sm">3. Increases security against related-key attacks</p>
                        <p className="text-gray-400 text-sm">4. Uses Maximum Distance Separable matrices</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-4">PHT (Pseudo-Hadamard Transform)</h3>
                      <div className="space-y-2">
                        <p className="text-gray-400 text-sm">1. Provides quick diffusion across bits</p>
                        <p className="text-gray-400 text-sm">2. Simple mathematical operation: a' = a + b, b' = a + 2b</p>
                        <p className="text-gray-400 text-sm">3. Enhances avalanche effect</p>
                        <p className="text-gray-400 text-sm">4. Contributes to mixing properties</p>
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
                        <HardDrive className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Disk encryption software (TrueCrypt, VeraCrypt)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Secure communications</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Database encryption</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Password managers (KeePass)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">File encryption utilities</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Comparison to Other Ciphers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-white">vs. AES (Rijndael)</h4>
                        <p className="text-gray-400 text-sm">Twofish has more complex key scheduling but may be slower on some platforms. Both offer excellent security.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">vs. Blowfish</h4>
                        <p className="text-gray-400 text-sm">Twofish is the successor to Blowfish with improved design and variable key lengths.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">vs. Serpent</h4>
                        <p className="text-gray-400 text-sm">Serpent has a larger security margin but is slower than Twofish.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">vs. ChaCha20</h4>
                        <p className="text-gray-400 text-sm">ChaCha20 is a stream cipher while Twofish is a block cipher; they serve different use cases.</p>
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
                    Code examples for implementing Twofish in different programming languages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="javascript" className="w-full">
                    <TabsList className="mb-4 bg-gray-900">
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="cpp">C++</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="javascript">
                      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <code className="text-gray-300">{`// Using crypto-js library for Twofish
// Note: crypto-js requires the separate twofish package

// First install:
// npm install crypto-js
// npm install crypto-js-twofish

const CryptoJS = require('crypto-js');
require('crypto-js-twofish');

// Key and IV should be WordArrays
function generateKey(size = 256) {
  // Generate random bytes for the key
  return CryptoJS.lib.WordArray.random(size / 8);
}

// IV is always 128 bits (16 bytes) for block ciphers
function generateIV() {
  return CryptoJS.lib.WordArray.random(16);
}

// Encrypt function
function encryptTwofish(plaintext, key, iv) {
  const encrypted = CryptoJS.Twofish.encrypt(
    plaintext,
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  
  return encrypted.toString();
}

// Decrypt function
function decryptTwofish(ciphertext, key, iv) {
  const decrypted = CryptoJS.Twofish.decrypt(
    ciphertext,
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// Example usage
const key = generateKey(256); // 256-bit key
const iv = generateIV();
const message = "Hello, Twofish!";

const encrypted = encryptTwofish(message, key, iv);
console.log("Encrypted:", encrypted);

const decrypted = decryptTwofish(encrypted, key, iv);
console.log("Decrypted:", decrypted);`}</code>
                      </pre>
                    </TabsContent>
                    
                    <TabsContent value="python">
                      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <code className="text-gray-300">{`# Using twofish library in Python
# Install with: pip install twofish

import twofish
import os
import binascii
from Crypto.Util.Padding import pad, unpad
from Crypto.Cipher import AES  # We use AES's modes for Twofish

# Generate random key of specified size (128, 192, or 256 bits)
def generate_key(key_size=256):
    key_bytes = key_size // 8
    return os.urandom(key_bytes)

# Generate random IV (always 16 bytes for block ciphers)
def generate_iv():
    return os.urandom(16)

# Encrypt using CBC mode
def encrypt_twofish_cbc(plaintext, key, iv):
    # Create Twofish object
    tf = twofish.Twofish(key)
    
    # Pad plaintext to block size (16 bytes)
    padded_data = pad(plaintext.encode('utf-8'), 16)
    
    blocks = []
    prev_block = iv
    
    # Process each block
    for i in range(0, len(padded_data), 16):
        block = padded_data[i:i+16]
        # XOR with previous ciphertext block (or IV for first block)
        xored = bytes(a ^ b for a, b in zip(block, prev_block))
        # Encrypt the XORed block
        encrypted_block = tf.encrypt(xored)
        blocks.append(encrypted_block)
        prev_block = encrypted_block
    
    # Concatenate IV and all encrypted blocks
    return iv + b''.join(blocks)

# Decrypt using CBC mode
def decrypt_twofish_cbc(ciphertext, key):
    # Extract IV from ciphertext
    iv = ciphertext[:16]
    ciphertext = ciphertext[16:]
    
    # Create Twofish object
    tf = twofish.Twofish(key)
    
    blocks = []
    prev_block = iv
    
    # Process each block
    for i in range(0, len(ciphertext), 16):
        block = ciphertext[i:i+16]
        # Decrypt the block
        decrypted_block = tf.decrypt(block)
        # XOR with previous ciphertext block (or IV for first block)
        xored = bytes(a ^ b for a, b in zip(decrypted_block, prev_block))
        blocks.append(xored)
        prev_block = block
    
    # Concatenate all decrypted blocks and unpad
    padded_data = b''.join(blocks)
    return unpad(padded_data, 16).decode('utf-8')

# Example usage
key = generate_key(256)  # 256-bit key
iv = generate_iv()
message = "Hello, Twofish!"

encrypted = encrypt_twofish_cbc(message, key, iv)
print("Encrypted (hex):", binascii.hexlify(encrypted).decode())

decrypted = decrypt_twofish_cbc(encrypted, key)
print("Decrypted:", decrypted)`}</code>
                      </pre>
                    </TabsContent>
                    
                    <TabsContent value="cpp">
                      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                        <code className="text-gray-300">{`// Using Crypto++ library for Twofish
// First install Crypto++ development package on your system

#include <iostream>
#include <string>
#include <cryptopp/twofish.h>
#include <cryptopp/modes.h>
#include <cryptopp/filters.h>
#include <cryptopp/osrng.h>
#include <cryptopp/hex.h>

using namespace CryptoPP;

// Generate random key of specified size
std::string generateKey(unsigned int keySize = 32) { // 32 bytes = 256 bits
    AutoSeededRandomPool rng;
    SecByteBlock key(keySize);
    rng.GenerateBlock(key, key.size());
    
    std::string keyStr;
    StringSource(key, key.size(), true,
        new HexEncoder(
            new StringSink(keyStr)
        )
    );
    return keyStr;
}

// Generate random IV (always 16 bytes for block ciphers)
std::string generateIV() {
    AutoSeededRandomPool rng;
    SecByteBlock iv(Twofish::BLOCKSIZE);
    rng.GenerateBlock(iv, iv.size());
    
    std::string ivStr;
    StringSource(iv, iv.size(), true,
        new HexEncoder(
            new StringSink(ivStr)
        )
    );
    return ivStr;
}

// Convert hex string to byte array
SecByteBlock hexToBytes(const std::string& hex) {
    std::string decoded;
    StringSource(hex, true,
        new HexDecoder(
            new StringSink(decoded)
        )
    );
    
    SecByteBlock bytes(reinterpret_cast<const byte*>(decoded.data()), decoded.size());
    return bytes;
}

// Encrypt function using CBC mode
std::string encryptTwofish(const std::string& plaintext, const std::string& keyHex, const std::string& ivHex) {
    SecByteBlock key = hexToBytes(keyHex);
    SecByteBlock iv = hexToBytes(ivHex);
    
    std::string ciphertext;
    
    try {
        CBC_Mode<Twofish>::Encryption encryption;
        encryption.SetKeyWithIV(key, key.size(), iv, iv.size());
        
        StringSource(plaintext, true,
            new StreamTransformationFilter(encryption,
                new StringSink(ciphertext)
            )
        );
    } catch(const Exception& e) {
        std::cerr << "Encryption error: " << e.what() << std::endl;
    }
    
    // Convert to hex for display
    std::string encodedCiphertext;
    StringSource(ciphertext, true,
        new HexEncoder(
            new StringSink(encodedCiphertext)
        )
    );
    
    return encodedCiphertext;
}

// Decrypt function using CBC mode
std::string decryptTwofish(const std::string& ciphertextHex, const std::string& keyHex, const std::string& ivHex) {
    SecByteBlock key = hexToBytes(keyHex);
    SecByteBlock iv = hexToBytes(ivHex);
    
    // Convert hex ciphertext to binary
    std::string ciphertext;
    StringSource(ciphertextHex, true,
        new HexDecoder(
            new StringSink(ciphertext)
        )
    );
    
    std::string decrypted;
    
    try {
        CBC_Mode<Twofish>::Decryption decryption;
        decryption.SetKeyWithIV(key, key.size(), iv, iv.size());
        
        StringSource(ciphertext, true,
            new StreamTransformationFilter(decryption,
                new StringSink(decrypted)
            )
        );
    } catch(const Exception& e) {
        std::cerr << "Decryption error: " << e.what() << std::endl;
    }
    
    return decrypted;
}

int main() {
    // Example usage
    std::string keyHex = generateKey(32); // 256-bit key
    std::string ivHex = generateIV();
    std::string message = "Hello, Twofish!";
    
    std::cout << "Key: " << keyHex << std::endl;
    std::cout << "IV: " << ivHex << std::endl;
    
    std::string encrypted = encryptTwofish(message, keyHex, ivHex);
    std::cout << "Encrypted: " << encrypted << std::endl;
    
    std::string decrypted = decryptTwofish(encrypted, keyHex, ivHex);
    std::cout << "Decrypted: " << decrypted << std::endl;
    
    return 0;
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

export default TwofishPage;