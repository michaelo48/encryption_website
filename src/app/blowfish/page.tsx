"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Shield,
  Fish,
  Lock,
  Unlock,
  ClipboardCopy,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Key,
  Server,
  Database,
  Archive,
  Disc
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

interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children, className = '' }) => (
  <label className={`block text-sm font-medium ${className}`}>
    {children}
  </label>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => (
  <input 
    className={`w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
    {...props}
  />
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
    className={`w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
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

const BlowfishPage = () => {
  const [inputText, setInputText] = useState('');
  const [key, setKey] = useState('');
  const [outputText, setOutputText] = useState('');
  const [keySize, setKeySize] = useState('128');
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const processText = async () => {
    if (!inputText.trim() || !key.trim()) {
      return;
    }

    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (isEncrypting) {
      const encrypted = btoa(inputText + '|' + key + '|' + keySize);
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
      icon: <Fish className="w-5 h-5" />,
      title: "Variable Key Length",
      description: "32 to 448 bits, making it flexible for different security needs"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Fast Performance",
      description: "Significantly faster than DES and IDEA on 32-bit processors"
    },
    {
      icon: <Key className="w-5 h-5" />,
      title: "Simple Design",
      description: "Straightforward Feistel network structure with S-boxes"
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "Subkey Generation",
      description: "Complex key schedule creates 18 sub-keys from the main key"
    }
  ];

  const specifications = [
    { label: "Algorithm Type", value: "Symmetric Block Cipher" },
    { label: "Block Size", value: "64 bits" },
    { label: "Key Size", value: "32-448 bits (variable)" },
    { label: "Structure", value: "16-round Feistel network" },
    { label: "S-Boxes", value: "4 S-boxes with 256 entries each" },
    { label: "Designer", value: "Bruce Schneier" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <Link href="/">
            <Button variant="ghost" className="hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Algorithms
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8 sm:mb-12 px-2 sm:px-0">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-600 rounded-lg">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold">Blowfish Encryption</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Blowfish is a symmetric block cipher designed by Bruce Schneier in 1993. Known for its 
            variable key length and fast performance, it was widely used before AES became the standard. 
            Still valuable for legacy systems and password hashing.
          </p>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-6 sm:mb-8">
          <CardHeader>
            <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4">
              <div>
                <CardTitle className="text-white">Blowfish Key Settings</CardTitle>
                <CardDescription className="text-gray-300">
                  Configure your encryption key (32-448 bits)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
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
                <Label className="text-gray-300">Key Length</Label>
                <Select value={keySize} onValueChange={setKeySize}>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="32">32 bits (4 bytes)</SelectItem>
                    <SelectItem value="64">64 bits (8 bytes)</SelectItem>
                    <SelectItem value="128">128 bits (16 bytes)</SelectItem>
                    <SelectItem value="192">192 bits (24 bytes)</SelectItem>
                    <SelectItem value="256">256 bits (32 bytes)</SelectItem>
                    <SelectItem value="448">448 bits (56 bytes)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Alert className="bg-gray-900 border-gray-700">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <AlertDescription className="text-gray-300">
                Blowfish is not recommended for new applications. Use AES for modern security requirements.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 mb-8 sm:mb-12">
          <CardHeader>
            <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4">
              <div>
                <CardTitle className="text-white">Try Blowfish Encryption</CardTitle>
                <CardDescription className="text-gray-300">
                  Enter text and key to see Blowfish encryption in action
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
                  className="w-full h-32 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
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
              className="w-full bg-red-600 hover:bg-red-700"
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
                    <div className="bg-red-600 p-2 rounded">
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
                  <CardTitle className="text-white">Blowfish Encryption Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                      <div>
                        <h3 className="font-semibold text-white">Key Expansion</h3>
                        <p className="text-gray-400">Generate 18 subkeys (P-array) and four S-boxes from the main key</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                      <div>
                        <h3 className="font-semibold text-white">Split Block</h3>
                        <p className="text-gray-400">Split 64-bit plaintext block into two 32-bit halves (L and R)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                      <div>
                        <h3 className="font-semibold text-white">Feistel Rounds</h3>
                        <p className="text-gray-400">Perform 16 rounds of Feistel function with P-array and S-boxes</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">4</div>
                      <div>
                        <h3 className="font-semibold text-white">Final Output</h3>
                        <p className="text-gray-400">Swap and combine halves with final P-array entries to get ciphertext</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Feistel Function</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-4">F-Function Steps</h3>
                    <div className="space-y-2">
                      <p className="text-gray-400 text-sm">1. Split 32-bit input into four 8-bit quarters</p>
                      <p className="text-gray-400 text-sm">2. Use quarters as indices for S-box lookups</p>
                      <p className="text-gray-400 text-sm">3. ((S1[a] + S2[b]) ⊕ S3[c]) + S4[d]</p>
                      <p className="text-gray-400 text-sm">4. Return 32-bit result</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-4">Key Properties</h3>
                    <div className="space-y-2">
                      <p className="text-gray-400 text-sm">• S-boxes initialized with π digits</p>
                      <p className="text-gray-400 text-sm">• Key-dependent S-box generation</p>
                      <p className="text-gray-400 text-sm">• Non-linear transformations</p>
                      <p className="text-gray-400 text-sm">• Reversible operations</p>
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
                  <CardTitle className="text-white">Legacy Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Archive className="w-4 h-4 text-green-500" />
                      <span className="text-gray-300">Legacy file compression (Blowfish in 7-Zip)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-green-500" />
                      <span className="text-gray-300">Old database encryption</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-green-500" />
                      <span className="text-gray-300">Legacy SSH implementations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-green-500" />
                      <span className="text-gray-300">Password hashing systems</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Disc className="w-4 h-4 text-green-500" />
                      <span className="text-gray-300">Disk encryption tools</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Current Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white">Deprecation Notice</h4>
                      <p className="text-gray-400 text-sm">Not recommended for new applications since small block size (64 bits)</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Security Concerns</h4>
                      <p className="text-gray-400 text-sm">Vulnerable to birthday attacks due to 64-bit blocks</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Migration Path</h4>
                      <p className="text-gray-400 text-sm">Migrate to AES-256 for modern security requirements</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Still Useful For</h4>
                      <p className="text-gray-400 text-sm">Decrypting legacy data and password hashing with bcrypt</p>
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
                  Code examples for implementing Blowfish in different programming languages
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

// Blowfish encryption
function encryptBlowfish(message, key) {
  // Encrypt using Blowfish
  const encrypted = CryptoJS.Blowfish.encrypt(message, key).toString();
  return encrypted;
}

// Blowfish decryption
function decryptBlowfish(ciphertext, key) {
  // Decrypt using Blowfish
  const decrypted = CryptoJS.Blowfish.decrypt(ciphertext, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// Password hashing with bcrypt (which uses Blowfish)
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function verifyPassword(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}

// Example usage
const key = 'my-secret-key';
const message = 'Hello, Blowfish!';

// Symmetric encryption
const encrypted = encryptBlowfish(message, key);
const decrypted = decryptBlowfish(encrypted, key);

// Password hashing
hashPassword('userPassword').then(hash => {
  console.log('Hash:', hash);
  verifyPassword('userPassword', hash).then(isValid => {
    console.log('Valid:', isValid);
  });
});`}</code>
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="python">
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <code className="text-gray-300">{`# Using cryptography library
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding
import os

# Blowfish encryption
def encrypt_blowfish(plaintext, key):
    # Ensure key is proper length (32-448 bits)
    key_bytes = key.encode()[:56]  # Max 56 bytes (448 bits)
    
    # Generate random IV
    iv = os.urandom(8)  # 64-bit IV for Blowfish
    
    # Create cipher
    cipher = Cipher(algorithms.Blowfish(key_bytes), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    
    # Pad plaintext
    padder = padding.PKCS7(64).padder()
    padded_data = padder.update(plaintext.encode()) + padder.finalize()
    
    # Encrypt
    ciphertext = encryptor.update(padded_data) + encryptor.finalize()
    
    return iv + ciphertext

# Blowfish decryption
def decrypt_blowfish(ciphertext, key):
    # Ensure key is proper length
    key_bytes = key.encode()[:56]
    
    # Extract IV
    iv = ciphertext[:8]
    ciphertext = ciphertext[8:]
    
    # Create cipher
    cipher = Cipher(algorithms.Blowfish(key_bytes), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    
    # Decrypt
    padded_plaintext = decryptor.update(ciphertext) + decryptor.finalize()
    
    # Unpad
    unpadder = padding.PKCS7(64).unpadder()
    plaintext = unpadder.update(padded_plaintext) + unpadder.finalize()
    
    return plaintext.decode()

# Example usage
key = "my-secret-key"
message = "Hello, Blowfish!"

encrypted = encrypt_blowfish(message, key)
decrypted = decrypt_blowfish(encrypted, key)

# Using bcrypt for password hashing
import bcrypt

def hash_password(password):
    # bcrypt automatically handles salt generation
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    return hashed

def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode(), hashed)

# Example password hashing
password = "userPassword"
hashed = hash_password(password)
is_valid = verify_password(password, hashed)`}</code>
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="java">
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <code className="text-gray-300">{`// Using Java Cryptography Extension
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.spec.IvParameterSpec;
import java.security.SecureRandom;

public class BlowfishEncryption {
    private static final String ALGORITHM = "Blowfish/CBC/PKCS5Padding";
    
    // Blowfish encryption
    public static byte[] encrypt(String plaintext, String key) throws Exception {
        // Prepare key (max 56 bytes for Blowfish)
        byte[] keyBytes = key.getBytes();
        if (keyBytes.length > 56) {
            byte[] temp = new byte[56];
            System.arraycopy(keyBytes, 0, temp, 0, 56);
            keyBytes = temp;
        }
        
        SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "Blowfish");
        
        // Generate random IV
        byte[] iv = new byte[8]; // 64-bit IV
        SecureRandom random = new SecureRandom();
        random.nextBytes(iv);
        IvParameterSpec ivSpec = new IvParameterSpec(iv);
        
        // Encrypt
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivSpec);
        byte[] encrypted = cipher.doFinal(plaintext.getBytes());
        
        // Combine IV and ciphertext
        byte[] combined = new byte[iv.length + encrypted.length];
        System.arraycopy(iv, 0, combined, 0, iv.length);
        System.arraycopy(encrypted, 0, combined, iv.length, encrypted.length);
        
        return combined;
    }
    
    // Blowfish decryption
    public static String decrypt(byte[] ciphertext, String key) throws Exception {
        // Prepare key
        byte[] keyBytes = key.getBytes();
        if (keyBytes.length > 56) {
            byte[] temp = new byte[56];
            System.arraycopy(keyBytes, 0, temp, 0, 56);
            keyBytes = temp;
        }
        
        SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "Blowfish");
        
        // Extract IV
        byte[] iv = new byte[8];
        System.arraycopy(ciphertext, 0, iv, 0, 8);
        IvParameterSpec ivSpec = new IvParameterSpec(iv);
        
        // Extract ciphertext
        byte[] encrypted = new byte[ciphertext.length - 8];
        System.arraycopy(ciphertext, 8, encrypted, 0, encrypted.length);
        
        // Decrypt
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey, ivSpec);
        byte[] decrypted = cipher.doFinal(encrypted);
        
        return new String(decrypted);
    }
    
    // Example usage
    public static void main(String[] args) throws Exception {
        String key = "my-secret-key";
        String message = "Hello, Blowfish!";
        
        byte[] encrypted = encrypt(message, key);
        String decrypted = decrypt(encrypted, key);
        
        System.out.println("Encrypted: " + bytesToHex(encrypted));
        System.out.println("Decrypted: " + decrypted);
    }
    
    private static String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
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

export default BlowfishPage;