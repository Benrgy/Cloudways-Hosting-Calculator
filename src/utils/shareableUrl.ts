
import { trackResultShare } from "./analytics";

export const generateShareableUrl = (inputs: any, results: any): string => {
  const shareData = {
    mc: inputs.monthlyHostingCost,
    sg: inputs.storageGB,
    bg: inputs.bandwidthGB,
    nw: inputs.numberOfWebsites,
    rt: inputs.responseTimeMS,
    rg: inputs.ramGB,
    cc: inputs.cpuCores,
    ssl: inputs.sslRequired ? 1 : 0,
    cn: inputs.complianceNeeds,
    bf: inputs.backupFrequency,
    cdn: inputs.cdnRequired ? 1 : 0
  };
  
  const encodedData = btoa(JSON.stringify(shareData));
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?calc=${encodedData}`;
};

export const parseShareableUrl = (): any | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const calcData = urlParams.get('calc');
  
  if (!calcData) return null;
  
  try {
    const decodedData = JSON.parse(atob(calcData));
    return {
      monthlyHostingCost: decodedData.mc || 15,
      storageGB: decodedData.sg || 20,
      bandwidthGB: decodedData.bg || 100,
      numberOfWebsites: decodedData.nw || 1,
      responseTimeMS: decodedData.rt || 1200,
      ramGB: decodedData.rg || 1,
      cpuCores: decodedData.cc || 1,
      sslRequired: decodedData.ssl === 1,
      complianceNeeds: decodedData.cn || "none",
      backupFrequency: decodedData.bf || "daily",
      cdnRequired: decodedData.cdn === 1
    };
  } catch (error) {
    console.warn('Failed to parse shareable URL:', error);
    return null;
  }
};

export const shareCalculation = async (inputs: any, results: any) => {
  const shareUrl = generateShareableUrl(inputs, results);
  const shareData = {
    title: "Cloudways Hosting Savings Calculator",
    text: `I could save $${results.monthlySavings.toFixed(2)} per month by switching to Cloudways!`,
    url: shareUrl
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      trackResultShare('native_share');
    } catch (err) {
      await copyToClipboard(shareUrl);
      trackResultShare('clipboard');
    }
  } else {
    await copyToClipboard(shareUrl);
    trackResultShare('clipboard');
  }
};

const copyToClipboard = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
};
