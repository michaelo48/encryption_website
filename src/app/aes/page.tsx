"use client";

import React, { useState } from 'react';
import { ArrowLeft, Shield, Key, Cpu, Lock, Unlock, ClipboardCopy, CheckCircle, AlertTriangle, Code, BookOpen, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// Import each component from its own file
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

// Add proper types for custom components
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => (
  <input 
    className={`w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

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

const Select: React.FC<SelectProps> = ({ children, value, onValueChange, className = '' }) => {
  return (
    <select 
      value={value} 
      onChange={(e) => onValueChange(e.target.value)}
      className={`w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </select>
  );
};

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

const AESPage = () => {
  const [inputText, setInputText] = useState('');
  const [key, setKey] = useState('');
  const [outputText, setOutputText] = useState('');
  const [keySize, setKeySize] = useState('256');
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock encryption function (replace with actual AES implementation)
  const processText = async () => {
    if (!inputText.trim() || !key.trim()) {
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (isEncrypting) {
      // Mock encryption - in real app, use a crypto library
      const encrypted = btoa(inputText + '|' + key + '|' + keySize);
      setOutputText(encrypted);
    } else {
      // Mock decryption
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

  const copyToClipboard = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
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
      icon: <Shield className="w-5 h-5" />,
      title: "Military-Grade Security",
      description: "Used by governments and military worldwide"
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: "Hardware Acceleration",
      description: "Optimized for modern processors with AES-NI"
    },
    {
      icon: <Key className="w-5 h-5" />,
      title: "Multiple Key Sizes",
      description: "128, 192, and 256-bit keys supported"
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Open Standard",
      description: "NIST FIPS 197 standard, publicly audited"
    }
  ];

  const specifications = [
    { label: "Algorithm Type", value: "Symmetric Block Cipher" },
    { label: "Block Size", value: "128 bits" },
    { label: "Key Sizes", value: "128, 192, 256 bits" },
    { label: "Rounds", value: "10, 12, 14 (depending on key size)" },
    { label: "Mode of Operation", value: "ECB, CBC, CFB, OFB, CTR, GCM" },
    { label: "Security Level", value: "Post-quantum resistant" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" className="hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Algorithms
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold">AES Encryption</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced Encryption Standard (AES) is the most widely used symmetric encryption algorithm. 
            Adopted by the U.S. government and used globally for securing classified information.
          </p>
        </div>

        {/* Interactive Demo Section */}
        <Card className="bg-gray-800 border-gray-700 mb-12">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Try AES Encryption</CardTitle>
                <CardDescription className="text-gray-300">
                  Enter text and a key to see AES encryption in action
                </CardDescription>
              </div>
              <Button 
                onClick={switchMode}
                variant="outline" 
                className="border-gray-600 hover:bg-gray-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {isEncrypting ? 'Switch to Decrypt' : 'Switch to Encrypt'}
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
                  className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      onClick={copyToClipboard}
                      size="sm"
                      className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600"
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-gray-300">Encryption Key</Label>
                <Input
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                  placeholder="Enter encryption key..."
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-300">Key Size</Label>
                <Select value={keySize} onValueChange={setKeySize}>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="128">128 bits</SelectItem>
                    <SelectItem value="192">192 bits</SelectItem>
                    <SelectItem value="256">256 bits</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={processText}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isProcessing || !inputText.trim() || !key.trim()}
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
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Information Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="bg-blue-600 p-2 rounded">
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
                  <CardTitle className="text-white">AES Encryption Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                      <div>
                        <h3 className="font-semibold text-white">Key Expansion</h3>
                        <p className="text-gray-400">The master key is expanded into multiple round keys</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                      <div>
                        <h3 className="font-semibold text-white">Initial Round</h3>
                        <p className="text-gray-400">XOR the plaintext with the first round key</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                      <div>
                        <h3 className="font-semibold text-white">Main Rounds</h3>
                        <p className="text-gray-400">Each round includes: SubBytes, ShiftRows, MixColumns, AddRoundKey</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">4</div>
                      <div>
                        <h3 className="font-semibold text-white">Final Round</h3>
                        <p className="text-gray-400">Same as main rounds but without MixColumns</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Key Operations</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-2">SubBytes</h3>
                    <p className="text-gray-400 text-sm">Non-linear substitution using an S-box</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">ShiftRows</h3>
                    <p className="text-gray-400 text-sm">Circular left shift of each row</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">MixColumns</h3>
                    <p className="text-gray-400 text-sm">Matrix multiplication in GF(2^8)</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">AddRoundKey</h3>
                    <p className="text-gray-400 text-sm">XOR with round key</p>
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
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-300">SSL/TLS for HTTPS websites</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-300">File and disk encryption</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-300">VPN protocols</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-300">WiFi (WPA2/WPA3)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-300">Secure messaging apps</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Industries Using AES</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-gray-700">Finance</Badge>
                      <span className="text-gray-300">Banking and payment systems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-gray-700">Healthcare</Badge>
                      <span className="text-gray-300">Patient data protection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-gray-700">Government</Badge>
                      <span className="text-gray-300">Classified information</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-gray-700">Technology</Badge>
                      <span className="text-gray-300">Cloud storage and services</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-gray-700">Communication</Badge>
                      <span className="text-gray-300">Email and messaging</span>
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
                  Code examples for implementing AES in different programming languages
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
                      <code className="text-gray-300">{`// Using crypto-js library
const CryptoJS = require('crypto-js');

function encryptAES(message, key) {
  return CryptoJS.AES.encrypt(message, key).toString();
}

function decryptAES(ciphertext, key) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Example usage
const key = 'my-secret-key';
const message = 'Hello, AES!';
const encrypted = encryptAES(message, key);
const decrypted = decryptAES(encrypted, key);`}</code>
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="python">
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <code className="text-gray-300">{`# Using cryptography library
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

def generate_key(password):
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=b'salt_here',
        iterations=100000,
    )
    key = base64.urlsafe_b64encode(kdf.derive(password.encode()))
    return key

# Example usage
key = generate_key('my-secret-key')
fernet = Fernet(key)
message = b'Hello, AES!'
encrypted = fernet.encrypt(message)
decrypted = fernet.decrypt(encrypted)`}</code>
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="java">
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <code className="text-gray-300">{`// Using Java Cryptography Extension
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class AESEncryption {
    private static final String ALGORITHM = "AES";
    
    public static byte[] encrypt(String data, byte[] key) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(key, ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        return cipher.doFinal(data.getBytes());
    }
    
    public static String decrypt(byte[] encryptedData, byte[] key) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(key, ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        return new String(cipher.doFinal(encryptedData));
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
  );
};

export default AESPage;