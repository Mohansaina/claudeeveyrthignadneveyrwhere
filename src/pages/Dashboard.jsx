import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../lib/auth';
import { generateComponent } from '../lib/tools/componentGenerator';
import { enhancePrompt } from '../lib/prompts/promptEnhancer';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Wand2, Copy, Check, Sparkles, LayoutTemplate, LogOut, Code2, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import { cn } from '../lib/utils';

const Dashboard = ({ user }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [enhancing, setEnhancing] = useState(false);
    const [copied, setCopied] = useState(false);
    const [viewMode, setViewMode] = useState('preview');

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Failed to log out');
        }
    };

    const handleGenerate = async (e) => {
        if (e?.preventDefault) e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        setError(null);
        setResponse('');
        setCopied(false);
        setViewMode('code');

        try {
            await generateComponent(prompt, (partial) => {
                setResponse(partial);
            });
            setViewMode('preview');
        } catch (err) {
            console.error("Gemini Error:", err);
            setError("Failed to generate response: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCopyCode = () => {
        if (!response) return;
        navigator.clipboard.writeText(response);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleEnhancePrompt = async () => {
        if (!prompt.trim()) return;
        setEnhancing(true);
        setError(null);
        try {
            const enhancedPrompt = await enhancePrompt(prompt);
            setPrompt(enhancedPrompt);
        } catch (err) {
            console.error("Enhance Error:", err);
            setError("Failed to enhance prompt. Check API key configuration.");
        } finally {
            setEnhancing(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-purple-100 selection:text-purple-900">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg shadow-sm">
                            <LayoutTemplate className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-700 tracking-tight">
                            AI Component
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-slate-500 hidden sm:inline-block bg-slate-100 px-3 py-1 rounded-full">
                            {user?.email}
                        </span>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Log Out</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid lg:grid-cols-[400px,1fr] xl:grid-cols-[450px,1fr] gap-8 items-stretch h-full min-h-[calc(100vh-12rem)]">

                    {/* Left Panel: Controls */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Build UI</h2>
                            <p className="text-slate-500">Describe your desired component and let AI craft the perfect React code.</p>
                        </div>

                        <Card className="flex-1 border-slate-200/60 shadow-md">
                            <CardHeader className="pb-4 border-b border-slate-100">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Sparkles className="w-5 h-5 text-purple-500" />
                                    Design Prompt
                                </CardTitle>
                                <CardDescription>Be as detailed or brief as you like.</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6 flex flex-col gap-4">
                                {error && (
                                    <div className="bg-red-50 border border-red-100 p-3 rounded-lg text-sm text-red-600 flex items-start gap-2">
                                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                        <p>{error}</p>
                                    </div>
                                )}

                                <Textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="e.g. A responsive pricing card with 3 tiers using vibrant gradients and modern styling, including a highly converting CTA button..."
                                    className="h-48 resize-none text-base"
                                    required
                                />

                                <div className="flex gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="flex-1 gap-2"
                                        onClick={handleEnhancePrompt}
                                        disabled={enhancing || loading || !prompt.trim()}
                                    >
                                        {enhancing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4 text-purple-600" />}
                                        Magic Enhance
                                    </Button>
                                    <Button
                                        onClick={handleGenerate}
                                        variant="gradient"
                                        disabled={loading || enhancing || !prompt.trim()}
                                        className="flex-1 gap-2"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Code2 className="w-4 h-4" />
                                        )}
                                        Generate
                                    </Button>
                                    {response && !loading && (
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            className="gap-2 px-3"
                                            onClick={handleGenerate}
                                            disabled={loading || enhancing}
                                            title="Regenerate"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Panel: Code Output */}
                    <Card className="flex flex-col shadow-lg border-slate-200/60 overflow-hidden bg-[#0d1117] relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 pointer-events-none" />

                        <div className="bg-slate-900/80 backdrop-blur-sm border-b border-white/10 px-4 py-3 flex items-center justify-between z-10 shrink-0">
                            <div className="flex gap-4 items-center">
                                <div className="flex gap-2 mr-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-inner"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-inner"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-inner"></div>
                                </div>
                                <div className="flex bg-slate-800/50 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode('preview')}
                                        className={cn("px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer", viewMode === 'preview' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200')}
                                    >Preview</button>
                                    <button
                                        onClick={() => setViewMode('code')}
                                        className={cn("px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer", viewMode === 'code' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200')}
                                    >Code</button>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCopyCode}
                                disabled={!response || loading}
                                className={cn(
                                    "h-8 px-2.5 text-xs gap-1.5 transition-all text-slate-300 hover:text-white hover:bg-white/10",
                                    copied && "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10"
                                )}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-3.5 h-3.5" /> Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5" /> Copy Code
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className={cn("flex-1 overflow-auto z-10 custom-scrollbar relative", viewMode === 'preview' && response && !loading ? 'bg-white' : 'p-6 bg-[#0d1117]')}>
                            {loading ? (
                                <div className="h-full w-full flex flex-col items-center justify-center space-y-4 font-mono text-slate-400">
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                                        <Loader2 className="w-10 h-10 text-purple-400 animate-spin relative" />
                                    </div>
                                    <p className="animate-pulse tracking-wide text-sm">Synthesizing React Component...</p>
                                </div>
                            ) : response ? (
                                viewMode === 'preview' ? (
                                    <div className="w-full h-full">
                                        <LiveProvider code={response} scope={{ React, ...LucideIcons }} noInline={true}>
                                            <div className="p-4 bg-red-50 empty:hidden">
                                                <LiveError className="text-red-600 font-mono text-xs whitespace-pre-wrap" />
                                            </div>
                                            <div className="w-full min-h-full p-8 text-slate-900 bg-white">
                                                <LivePreview />
                                            </div>
                                        </LiveProvider>
                                    </div>
                                ) : (
                                    <pre className="text-[13px] leading-relaxed font-mono text-emerald-400/90 select-all whitespace-pre-wrap font-medium">
                                        <code>{response}</code>
                                    </pre>
                                )
                            ) : (
                                <div className="h-full w-full flex flex-col items-center justify-center text-slate-500 gap-4 opacity-50">
                                    <Code2 className="w-16 h-16" strokeWidth={1} />
                                    <p className="font-mono text-sm">Awaiting your constraints...</p>
                                </div>
                            )}
                        </div>
                    </Card>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
