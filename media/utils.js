export function userDeviceType() {
  const ua = navigator.userAgent;
  // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
  return /Mobi|Android|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(ua)
    ? "MOBILE"
    : /Tablet|iPad|Nexus 7|Nexus 10|KFAPWI/i.test(ua)
    ? "TABLET"
    : "DESKTOP";
}


export function indentHTML(html, indentSize = 2) {
  const INDENT = ' '.repeat(indentSize);

  function hasOnlyText(node) {
    return Array.from(node.childNodes).every(n => n.nodeType === Node.TEXT_NODE);
  }

  function formatNode(node, depth = 0) {
    const indent = INDENT.repeat(depth);
    let result = '';

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      return text ? indent + text + '\n' : '';
    }

    if (node.nodeType === Node.COMMENT_NODE) {
      return `${indent}<!-- ${node.nodeValue.trim()} -->\n`;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.tagName.toLowerCase();
      const attrs = Array.from(node.attributes).map(attr => `${attr.name}="${attr.value}"`).join(' ');
      const openTag = `<${tag}${attrs ? ' ' + attrs : ''}>`;
      const closeTag = `</${tag}>`;

      const children = Array.from(node.childNodes);
      const onlyText = hasOnlyText(node);

      if (onlyText) {
        const text = children.map(c => c.textContent.trim()).join('');
        return `${indent}${openTag}${text}${closeTag}\n`;
      } else {
        result += `${indent}${openTag}\n`;

        children.forEach(child => {
          result += formatNode(child, depth + 1);
        });

        result += `${indent}${closeTag}\n`;
      }
    }

    return result;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  let output = '';

  doc.body.childNodes.forEach(node => {
    output += formatNode(node);
  });

  return output.trim();
}




export function utf8ToBase64(str) {
    let utf8Bytes = new TextEncoder().encode(str);
    let binaryString = '';
    const chunkSize = 0x8000; // Process chunks of 32KB to avoid memory issues
    for (let i = 0; i < utf8Bytes.length; i += chunkSize) {
        const chunk = utf8Bytes.subarray(i, i + chunkSize);
        binaryString += String.fromCharCode.apply(null, chunk);
    }
    return btoa(binaryString);
}


// Function to decode HTML entities
export function decodeHTMLEntities(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.documentElement.textContent;
}


export const copyText = (text, callback) => 
    navigator.clipboard?.writeText(text).then(callback).catch(console.error);

export function base64ToUtf8(str) {
    let binaryString = atob(str);
    let bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
}


export function brToNewLine(str){
    return str.replace(/<br\s*\/?>/gi, "\n");
}

export function getTimeGap(dateFrom) {
    let d1 = new Date(dateFrom);
    if (isNaN(d1.getTime())) return;
    
    let d2 = new Date();
    
    let df_ms = Math.abs(d2 - d1);
    let df_s = Math.floor(df_ms / 1000);
    let df_mn = Math.floor(df_s / 60);
    let df_hr = Math.floor(df_mn / 60);
    let df_d = Math.floor(df_hr / 24);
    
    let df_yr = d2.getFullYear() - d1.getFullYear();
    let df_mo = (df_yr * 12) + (d2.getMonth() - d1.getMonth());
    
    if (d2.getDate() < d1.getDate()) {
        df_mo--;
    }

    if (d2.getMonth() < d1.getMonth() || (d2.getMonth() === d1.getMonth() && d2.getDate() < d1.getDate())) {
        df_yr--;
    }

    df_mo = Math.max(df_mo, 0);
    df_yr = Math.max(df_yr, 0);

    let df_gap =
        df_yr >= 1 ? `${df_yr}yr` :
        df_mo >= 1 ? `${df_mo}mo` :
        df_d >= 1 ? `${df_d}d` :
        df_hr >= 1 ? `${df_hr}hr` :
        df_mn >= 1 ? `${df_mn}min` :
        'now';

    return df_gap;
}

export function  updatePageAddress(title, url) {
        if (!title) return;
        document.title = title;
        if (!url) return;
        updateUrl(url);
    }


export function updateUrl(urlText){
    if(urlText){
       let defaultUrl = window.location.origin
       let newUrl = defaultUrl + urlText
       window.history.pushState({path:newUrl},'',newUrl)
   }
}



export function formatFileSize(bytes) {
    const KB = 1024;
    const MB = KB * 1024;
    const GB = MB * 1024;
    return bytes < MB 
        ? Math.round(bytes / KB) + ' KB' 
        : bytes < GB 
        ? Math.round(bytes / MB) + ' MB' 
        : Math.round(bytes / GB) + ' GB';
}



export function getFileType(file_name) {
    let file_ext = file_name.split('.').pop().toLowerCase();
    let fileExtension = {
        image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg','jfif'],
        video: ['mp4', 'webm', 'ogg'],
        audio: ['mp3', 'wav', 'ogg', 'aac', 'm4a'],
        doc: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'rtf', 'odt', 'ods', 'odp'],
        text: ['c', 'h', 'cpp', 'hpp', 'cc', 'cxx', 'hxx', 'java', 'class', 'jar', 'py', 'pyc', 'pyo', 'pyw', 'js', 'mjs', 'jsx', 'ts', 'tsx', 'html', 'htm', 'css', 'php', 'phtml', 'php3', 'php4', 'php5', 'phps', 'rb', 'erb', 'pl', 'pm', 'sh', 'bash', 'zsh', 'r', 'rdata', 'rds', 'sql', 'swift', 'kt', 'kts', 'go', 'rs', 'scala', 'hs', 'lhs', 'cs', 'vb', 'fs', 'm', 'mm', 'f', 'for', 'f90', 'asm', 's', 'pas', 'adb', 'ads', 'vhdl', 'vhd', 'v', 'vh', 'lua', 'tcl', 'dart', 'ex', 'exs', 'erl', 'hrl', 'pl', 'pro', 'cob', 'cbl', 'rkt', 'ji', 'lisp', 'lsp', 'cl', 'scm', 'd', 'groovy', 'rexx', 'rex', 'st', 'vbs', 'ps1', 'coffee', 'ipynb', 'tex', 'sty', 'cls', 'json', 'txt', 'sas', 'scss', 'xml']
    };
    for (let [type, extensions] of Object.entries(fileExtension)) {
        if (extensions.includes(file_ext)) {
            return type;
        }
    }
    return null;
}



export function downloadTextFile(content,fileExt='txt',fileName='TextFile'){
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.${fileExt}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


export async function downloadFile(url,filename='downloaded-file'){
   try{
      let response  = await fetch(url)
      if(!response.ok) return false ;
      let blob = await response.blob()
      let downloadUrl = window.URL.createObjectURL(blob)
      let link = create('a',{
        attr:`href=${downloadUrl} download=${filename}`
      },document.body)      
      link.click()
      link.remove()
      window.URL.revokeObjectURL(downloadUrl)
      return true
   }catch(err){
    return {error:err,status:false}
    }
}


export function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
}

export function purifyURL(input) {
    return encodeURI(input.trim());
}


export async function getFetchData(url, options = {}, callback) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            callback?.(response);
            return false;
        }
        return await response.json();
    } catch {
        return false;
    }
}


export function replaceBackslashWithAt(str) {
    return str.replace(/\\/g, '@');
}

export function replaceAtWithBackslash(str) {
    return str.replace(/@/g, '\\');
}


export function stdText(text){
    return text.replace(/\s+/g, ' ').trim();
}

export function removeSymbol(text) {
    return text.replace(/[^a-zA-Z0-9. ]/g, '')
}


export async function translateLanguage(word,soruce,target,callback){
 let res    = await fetch(`https://api.mymemory.translated.net/get?q=${word}!&langpair=${soruce}|${target}`)
 let result = await res.json()
 if(!res.ok){
    callback()
    return ;
 }
 return res.ok ? result.matches[0].translation : false 
}


export function html2Code(html_code){ //ignore entities
    let code = brToNewLine(html_code)//replace br tag by \n
    code = decodeEntities(code)//decoding html entities        
    code  = code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return code
}

export function code2Html(code){
   return code.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}



export function randomKey(config = {}) {
    const length = config.length || 8;
    const useNumbers = config.number || false;
    const useLetters = config.string || false;
    const useBoth = config.both || false;
    const extra_char = config.include || ''

    let charset = '';

    if (useBoth || (!useNumbers && !useLetters)) {
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    } else {
        if (useNumbers) charset += '0123456789';
        if (useLetters) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    }

    charset += extra_char


    let result = '';
    for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
}
