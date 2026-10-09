import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Image as ImageIcon,
  Wand2,
  Download,
  Upload,
  RefreshCw,
  AlertCircle,
  Eye,
  Sliders,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';

// Sample store assets available for instant editing
import bpDeviceImg from '../../assets/images/bp_monitor_device_1791454734358.jpg';
import glDeviceImg from '../../assets/images/glucometer_device_kit_1791454747005.jpg';
import oximeterDeviceImg from '../../assets/images/pulse_oximeter_device_1791454757928.jpg';
import thermoDeviceImg from '../../assets/images/infrared_thermometer_device_1791454768970.jpg';
import scaleDeviceImg from '../../assets/images/digital_weighing_scale_1791455095976.jpg';

export const GeminiImageStudio: React.FC = () => {
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [prompt, setPrompt] = useState('High precision digital blood pressure monitor with glowing blue LCD display reading 120/80 on clean modern bedside table');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '4:3' | '9:16'>('1:1');
  const [imageSize, setImageSize] = useState<'1K' | '2K'>('1K');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Edit Mode Image Selection
  const [selectedImageForEdit, setSelectedImageForEdit] = useState<string>(bpDeviceImg);
  const [customUploadedImage, setCustomUploadedImage] = useState<string | null>(null);

  // Result
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageHistory, setImageHistory] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleCreationPrompts = [
    'Digital upper-arm BP monitor with illuminated LCD screen on minimalist wooden table',
    'Pocket-sized blood glucose meter kit with test strip inserted and 105 mg/dL reading',
    'Pediatric ultrasonic mesh nebulizer with transparent child mask and soft blue mist',
    'Fingertip digital pulse oximeter clipped on index finger showing 98% SpO2 and 72 bpm',
  ];

  const sampleEditPrompts = [
    'Add a sleek protective zippered travel carrying case next to the device',
    'Show the digital screen with illuminated green numbers reading 120/80',
    'Place on a warm wooden nightstand next to a glass of water and notebook',
    'Add clean medical packaging box in the background with warranty seal',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCustomUploadedImage(base64);
        setSelectedImageForEdit(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      if (mode === 'create') {
        const res = await fetch('/api/images/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: prompt.trim(),
            aspectRatio,
            imageSize,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to generate image with gemini-nano-banana-2.1.');
        }

        setGeneratedImage(data.imageUrl);
        setImageHistory((prev) => [data.imageUrl, ...prev.slice(0, 5)]);
      } else {
        // Edit mode
        const imageToEdit = selectedImageForEdit;
        let base64Payload = imageToEdit;

        // If it's a URL path (imported asset), fetch and convert to base64
        if (imageToEdit.startsWith('/') || imageToEdit.startsWith('http')) {
          const resp = await fetch(imageToEdit);
          const blob = await resp.blob();
          base64Payload = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        }

        const res = await fetch('/api/images/edit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: prompt.trim(),
            base64Image: base64Payload,
            aspectRatio,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to edit image with gemini-nano-banana-2.1.');
        }

        setGeneratedImage(data.imageUrl);
        setImageHistory((prev) => [data.imageUrl, ...prev.slice(0, 5)]);
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.message ||
          'Image generation failed. If you declined the paid API key setup, gemini-nano-banana-2.1 requires an active billing-enabled API key in Settings > Secrets.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const a = document.createElement('a');
    a.href = generatedImage;
    a.download = `azamgarh-medical-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-100 text-purple-800">
              <Wand2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              AI Medical Device Studio
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-medium">
              gemini-nano-banana-2.1
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Create high-fidelity medical device mockups or edit equipment photography with natural language prompts using <span className="font-semibold text-slate-800">gemini-nano-banana-2.1</span>.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200">
          <button
            type="button"
            onClick={() => {
              setMode('create');
              setPrompt('High precision digital blood pressure monitor with glowing blue LCD display reading 120/80 on clean modern bedside table');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'create'
                ? 'bg-white text-purple-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create New</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('edit');
              setPrompt('Add a sleek protective zippered travel carrying case next to the device');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'edit'
                ? 'bg-white text-purple-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Edit Existing</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-4">
          {/* Edit Mode: Source Image Picker */}
          {mode === 'edit' && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-purple-700" />
                  Select Medical Device Image to Edit:
                </span>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-purple-700 hover:text-purple-900 flex items-center gap-1 font-medium"
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload Custom</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Sample Device Thumbnails */}
              <div className="grid grid-cols-5 gap-2">
                {[
                  { name: 'BP Monitor', src: bpDeviceImg },
                  { name: 'Glucometer', src: glDeviceImg },
                  { name: 'Oximeter', src: oximeterDeviceImg },
                  { name: 'Thermometer', src: thermoDeviceImg },
                  { name: 'Scale', src: scaleDeviceImg },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageForEdit(item.src)}
                    className={`p-1 rounded-lg border text-center transition-all bg-white overflow-hidden ${
                      selectedImageForEdit === item.src
                        ? 'border-purple-600 ring-2 ring-purple-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-12 object-contain rounded"
                    />
                    <span className="text-[10px] text-slate-600 font-medium block truncate mt-1">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>

              {customUploadedImage && selectedImageForEdit === customUploadedImage && (
                <div className="text-xs text-emerald-700 flex items-center gap-1 bg-emerald-50 p-2 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Using custom uploaded device photo for editing</span>
                </div>
              )}
            </div>
          )}

          {/* Prompt Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {mode === 'create' ? 'Visual Description Prompt:' : 'Instruction for Image Edit:'}
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                mode === 'create'
                  ? 'Describe medical device appearance, lighting, screen reading, environment...'
                  : 'Specify modifications (e.g. Add case, change display numbers, adjust background)...'
              }
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white resize-none transition-all"
            />

            {/* Quick Templates */}
            <div className="mt-2">
              <span className="text-[11px] text-slate-600 block mb-1">
                Suggested {mode === 'create' ? 'creation' : 'edit'} prompts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(mode === 'create' ? sampleCreationPrompts : sampleEditPrompts).map((sp, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPrompt(sp)}
                    className="text-xs bg-slate-100 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 text-left transition-all"
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Image Configurations */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Aspect Ratio:
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as any)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              >
                <option value="1:1">1:1 Square (Product Tile)</option>
                <option value="16:9">16:9 Widescreen (Banner)</option>
                <option value="4:3">4:3 Standard (Catalogue)</option>
                <option value="9:16">9:16 Vertical (Mobile)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Resolution:
              </label>
              <select
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value as any)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              >
                <option value="1K">1K Standard Quality</option>
                <option value="2K">2K Ultra HD Studio</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!prompt.trim() || loading}
            className="w-full py-3 bg-purple-700 hover:bg-purple-800 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing with gemini-nano-banana-2.1...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>{mode === 'create' ? 'Generate Device Visualization' : 'Apply AI Edit'}</span>
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Notice on gemini-nano-banana-2.1:</span>
                <span className="text-amber-800 mt-0.5 block leading-relaxed">{error}</span>
                <span className="text-[11px] text-amber-700 mt-1 block">
                  Tip: If billing setup was declined, you can still test with text prompts or configure your billing-enabled key in Settings &gt; Secrets anytime.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Preview Output Column */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center min-h-[350px] p-4 rounded-xl bg-slate-50 border border-slate-200">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-purple-200 border-t-purple-700 animate-spin"></div>
                <Sparkles className="w-6 h-6 text-purple-600 absolute inset-0 m-auto" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                Rendering with gemini-nano-banana-2.1...
              </p>
              <p className="text-xs text-slate-500 max-w-xs">
                Generating high-fidelity medical product asset with studio lighting and clinical details.
              </p>
            </div>
          ) : generatedImage ? (
            <div className="w-full flex flex-col items-center space-y-3">
              <div className="relative group max-w-full rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                <img
                  src={generatedImage}
                  alt="Generated Medical Device"
                  className="max-h-[360px] w-auto object-contain mx-auto"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Image</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedImageForEdit(generatedImage);
                    setMode('edit');
                    setPrompt('Refine details or add accessories to this medical device');
                  }}
                  className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-purple-200 transition-all"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Edit this Output</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto border border-purple-100">
                <ImageIcon className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-semibold text-slate-800">No Image Rendered Yet</h4>
              <p className="text-xs text-slate-500 max-w-xs">
                Enter a device description prompt and click generate to create custom medical equipment visuals using gemini-nano-banana-2.1.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
