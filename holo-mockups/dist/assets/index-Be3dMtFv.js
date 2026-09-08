var Xg=Object.defineProperty;var Yg=(e,t,n)=>t in e?Xg(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var nn=(e,t,n)=>Yg(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qh="185",Rr={ROTATE:0,DOLLY:1,PAN:2},Ar={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},qg=0,Af=1,Kg=2,Xo=1,Zg=2,wa=3,_s=0,Pn=1,bi=2,Ri=0,Cr=1,Rn=2,wf=3,Rf=4,$g=5,Ds=100,Jg=101,jg=102,Qg=103,t_=104,e_=200,n_=201,i_=202,s_=203,zc=204,Gc=205,r_=206,a_=207,o_=208,l_=209,c_=210,h_=211,u_=212,f_=213,d_=214,Vc=0,Hc=1,Wc=2,Nr=3,Xc=4,Yc=5,qc=6,Kc=7,qp=0,p_=1,m_=2,Ci=0,Kp=1,Zp=2,$p=3,tu=4,Jp=5,jp=6,Qp=7,tm=300,Xs=301,Fr=302,$l=303,Jl=304,Ml=306,Zc=1e3,Xi=1001,$c=1002,on=1003,g_=1004,no=1005,ln=1006,jl=1007,Fs=1008,ni=1009,em=1010,nm=1011,Na=1012,eu=1013,Li=1014,Ti=1015,zn=1016,nu=1017,iu=1018,Fa=1020,im=35902,sm=35899,rm=1021,am=1022,hi=1023,Zi=1026,Os=1027,om=1028,su=1029,Ys=1030,ru=1031,au=1033,Yo=33776,qo=33777,Ko=33778,Zo=33779,Jc=35840,jc=35841,Qc=35842,th=35843,eh=36196,nh=37492,ih=37496,sh=37488,rh=37489,tl=37490,ah=37491,oh=37808,lh=37809,ch=37810,hh=37811,uh=37812,fh=37813,dh=37814,ph=37815,mh=37816,gh=37817,_h=37818,vh=37819,xh=37820,Mh=37821,Sh=36492,yh=36494,Eh=36495,bh=36283,Th=36284,el=36285,Ah=36286,__=3200,Cf=0,v_=1,ds="",ti="srgb",nl="srgb-linear",il="linear",le="srgb",sr=7680,Pf=519,x_=512,M_=513,S_=514,ou=515,y_=516,E_=517,lu=518,b_=519,wh=35044,Lf="300 es",Ai=2e3,sl=2001;function T_(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function rl(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function A_(){const e=rl("canvas");return e.style.display="block",e}const Df={};function al(...e){const t="THREE."+e.shift();console.log(t,...e)}function lm(e){const t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Ut(...e){e=lm(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Qt(...e){e=lm(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Pr(...e){const t=e.join(" ");t in Df||(Df[t]=!0,Ut(...e))}function w_(e,t,n){return new Promise(function(i,s){function r(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(r,n);break;default:i()}}setTimeout(r,n)})}const R_={[Vc]:Hc,[Wc]:qc,[Xc]:Kc,[Nr]:Yc,[Hc]:Vc,[qc]:Wc,[Kc]:Xc,[Yc]:Nr};class Ss{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(n);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const i=n[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const un=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let If=1234567;const Lr=Math.PI/180,Oa=180/Math.PI;function qi(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(un[e&255]+un[e>>8&255]+un[e>>16&255]+un[e>>24&255]+"-"+un[t&255]+un[t>>8&255]+"-"+un[t>>16&15|64]+un[t>>24&255]+"-"+un[n&63|128]+un[n>>8&255]+"-"+un[n>>16&255]+un[n>>24&255]+un[i&255]+un[i>>8&255]+un[i>>16&255]+un[i>>24&255]).toLowerCase()}function Yt(e,t,n){return Math.max(t,Math.min(n,e))}function cu(e,t){return(e%t+t)%t}function C_(e,t,n,i,s){return i+(e-t)*(s-i)/(n-t)}function P_(e,t,n){return e!==t?(n-e)/(t-e):0}function La(e,t,n){return(1-n)*e+n*t}function L_(e,t,n,i){return La(e,t,1-Math.exp(-n*i))}function D_(e,t=1){return t-Math.abs(cu(e,t*2)-t)}function I_(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function U_(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function N_(e,t){return e+Math.floor(Math.random()*(t-e+1))}function F_(e,t){return e+Math.random()*(t-e)}function O_(e){return e*(.5-Math.random())}function B_(e){e!==void 0&&(If=e);let t=If+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function k_(e){return e*Lr}function z_(e){return e*Oa}function G_(e){return(e&e-1)===0&&e!==0}function V_(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))}function H_(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}function W_(e,t,n,i,s){const r=Math.cos,a=Math.sin,o=r(n/2),l=a(n/2),c=r((t+i)/2),u=a((t+i)/2),f=r((t-i)/2),h=a((t-i)/2),p=r((i-t)/2),_=a((i-t)/2);switch(s){case"XYX":e.set(o*u,l*f,l*h,o*c);break;case"YZY":e.set(l*h,o*u,l*f,o*c);break;case"ZXZ":e.set(l*f,l*h,o*u,o*c);break;case"XZX":e.set(o*u,l*_,l*p,o*c);break;case"YXY":e.set(l*p,o*u,l*_,o*c);break;case"ZYZ":e.set(l*_,l*p,o*u,o*c);break;default:Ut("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ci(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ce(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Rh={DEG2RAD:Lr,RAD2DEG:Oa,generateUUID:qi,clamp:Yt,euclideanModulo:cu,mapLinear:C_,inverseLerp:P_,lerp:La,damp:L_,pingpong:D_,smoothstep:I_,smootherstep:U_,randInt:N_,randFloat:F_,randFloatSpread:O_,seededRandom:B_,degToRad:k_,radToDeg:z_,isPowerOfTwo:G_,ceilPowerOfTwo:V_,floorPowerOfTwo:H_,setQuaternionFromProperEuler:W_,normalize:ce,denormalize:ci},_f=class _f{constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Yt(this.x,t.x,n.x),this.y=Yt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Yt(this.x,t,n),this.y=Yt(this.y,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Yt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(Yt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),s=Math.sin(n),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};_f.prototype.isVector2=!0;let yt=_f;class vs{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3],h=r[a+0],p=r[a+1],_=r[a+2],S=r[a+3];if(f!==S||l!==h||c!==p||u!==_){let m=l*h+c*p+u*_+f*S;m<0&&(h=-h,p=-p,_=-_,S=-S,m=-m);let d=1-o;if(m<.9995){const y=Math.acos(m),E=Math.sin(y);d=Math.sin(d*y)/E,o=Math.sin(o*y)/E,l=l*d+h*o,c=c*d+p*o,u=u*d+_*o,f=f*d+S*o}else{l=l*d+h*o,c=c*d+p*o,u=u*d+_*o,f=f*d+S*o;const y=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=y,c*=y,u*=y,f*=y}}t[n]=l,t[n+1]=c,t[n+2]=u,t[n+3]=f}static multiplyQuaternionsFlat(t,n,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[a],h=r[a+1],p=r[a+2],_=r[a+3];return t[n]=o*_+u*f+l*p-c*h,t[n+1]=l*_+u*h+c*f-o*p,t[n+2]=c*_+u*p+o*h-l*f,t[n+3]=u*_-o*f-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),f=o(r/2),h=l(i/2),p=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=h*u*f+c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f-h*p*_;break;case"YXZ":this._x=h*u*f+c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f+h*p*_;break;case"ZXY":this._x=h*u*f-c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f-h*p*_;break;case"ZYX":this._x=h*u*f-c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f+h*p*_;break;case"YZX":this._x=h*u*f+c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f-h*p*_;break;case"XZY":this._x=h*u*f-c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f+h*p*_;break;default:Ut("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],s=n[4],r=n[8],a=n[1],o=n[5],l=n[9],c=n[2],u=n[6],f=n[10],h=i+o+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,s=t._y,r=t._z,a=t._w,o=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,n){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,n=Math.sin(n*c)/u,this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+r*n,this._w=this._w*l+a*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+r*n,this._w=this._w*l+a*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(n),r*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const vf=class vf{constructor(t=0,n=0,i=0){this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Uf.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Uf.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6]*s,this.y=r[1]*n+r[4]*i+r[7]*s,this.z=r[2]*n+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*n+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*n+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*n+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*n+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const n=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),u=2*(o*n-r*s),f=2*(r*i-a*n);return this.x=n+l*c+a*f-o*u,this.y=i+l*u+o*c-r*f,this.z=s+l*f+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s,this.y=r[1]*n+r[5]*i+r[9]*s,this.z=r[2]*n+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Yt(this.x,t.x,n.x),this.y=Yt(this.y,t.y,n.y),this.z=Yt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Yt(this.x,t,n),this.y=Yt(this.y,t,n),this.z=Yt(this.z,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Yt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,s=t.y,r=t.z,a=n.x,o=n.y,l=n.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ql.copy(this).projectOnVector(t),this.sub(Ql)}reflect(t){return this.sub(Ql.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(Yt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};vf.prototype.isVector3=!0;let P=vf;const Ql=new P,Uf=new vs,xf=class xf{constructor(t,n,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,r,a,o,l,c)}set(t,n,i,s,r,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=n,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,s=n.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],p=i[5],_=i[8],S=s[0],m=s[3],d=s[6],y=s[1],E=s[4],M=s[7],w=s[2],b=s[5],C=s[8];return r[0]=a*S+o*y+l*w,r[3]=a*m+o*E+l*b,r[6]=a*d+o*M+l*C,r[1]=c*S+u*y+f*w,r[4]=c*m+u*E+f*b,r[7]=c*d+u*M+f*C,r[2]=h*S+p*y+_*w,r[5]=h*m+p*E+_*b,r[8]=h*d+p*M+_*C,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return n*a*u-n*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=u*a-o*c,h=o*l-u*r,p=c*r-a*l,_=n*f+i*h+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/_;return t[0]=f*S,t[1]=(s*c-u*i)*S,t[2]=(o*i-s*a)*S,t[3]=h*S,t[4]=(u*n-s*l)*S,t[5]=(s*r-o*n)*S,t[6]=p*S,t[7]=(i*l-c*n)*S,t[8]=(a*n-i*r)*S,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+n,0,0,1),this}scale(t,n){return Pr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(tc.makeScale(t,n)),this}rotate(t){return Pr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(tc.makeRotation(-t)),this}translate(t,n){return Pr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(tc.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};xf.prototype.isMatrix3=!0;let Bt=xf;const tc=new Bt,Nf=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ff=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function X_(){const e={enabled:!0,workingColorSpace:nl,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===le&&(s.r=Ki(s.r),s.g=Ki(s.g),s.b=Ki(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===le&&(s.r=Dr(s.r),s.g=Dr(s.g),s.b=Dr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ds?il:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Pr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Pr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[nl]:{primaries:t,whitePoint:i,transfer:il,toXYZ:Nf,fromXYZ:Ff,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ti},outputColorSpaceConfig:{drawingBufferColorSpace:ti}},[ti]:{primaries:t,whitePoint:i,transfer:le,toXYZ:Nf,fromXYZ:Ff,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ti}}}),e}const Kt=X_();function Ki(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Dr(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}let rr;class Y_{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{rr===void 0&&(rr=rl("canvas")),rr.width=t.width,rr.height=t.height;const s=rr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=rr}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=rl("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ki(r[a]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ki(n[i]/255)*255):n[i]=Ki(n[i]);return{data:n,width:t.width,height:t.height}}else return Ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let q_=0;class hu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:q_++}),this.uuid=qi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ec(s[a].image)):r.push(ec(s[a]))}else r=ec(s);i.url=r}return n||(t.images[this.uuid]=i),i}}function ec(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Y_.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Ut("Texture: Unable to serialize Texture."),{})}let K_=0;const nc=new P;class _n extends Ss{constructor(t=_n.DEFAULT_IMAGE,n=_n.DEFAULT_MAPPING,i=Xi,s=Xi,r=ln,a=Fs,o=hi,l=ni,c=_n.DEFAULT_ANISOTROPY,u=ds){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:K_++}),this.uuid=qi(),this.name="",this.source=new hu(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(nc).x}get height(){return this.source.getSize(nc).y}get depth(){return this.source.getSize(nc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const i=t[n];if(i===void 0){Ut(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){Ut(`Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==tm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Zc:t.x=t.x-Math.floor(t.x);break;case Xi:t.x=t.x<0?0:1;break;case $c:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Zc:t.y=t.y-Math.floor(t.y);break;case Xi:t.y=t.y<0?0:1;break;case $c:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}_n.DEFAULT_IMAGE=null;_n.DEFAULT_MAPPING=tm;_n.DEFAULT_ANISOTROPY=1;const Mf=class Mf{constructor(t=0,n=0,i=0,s=1){this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*n+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*n+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*n+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,r;const l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],_=l[9],S=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-S)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+S)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const E=(c+1)/2,M=(p+1)/2,w=(d+1)/2,b=(u+h)/4,C=(f+S)/4,v=(_+m)/4;return E>M&&E>w?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=b/i,r=C/i):M>w?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=b/s,r=v/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=C/r,s=v/r),this.set(i,s,r,n),this}let y=Math.sqrt((m-_)*(m-_)+(f-S)*(f-S)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(f-S)/y,this.z=(h-u)/y,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Yt(this.x,t.x,n.x),this.y=Yt(this.y,t.y,n.y),this.z=Yt(this.z,t.z,n.z),this.w=Yt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Yt(this.x,t,n),this.y=Yt(this.y,t,n),this.z=Yt(this.z,t,n),this.w=Yt(this.w,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Yt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Mf.prototype.isVector4=!0;let Fe=Mf;class Z_ extends Ss{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Fe(0,0,t,n),this.scissorTest=!1,this.viewport=new Fe(0,0,t,n),this.textures=[];const s={width:t,height:n,depth:i.depth},r=new _n(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){const n={minFilter:ln,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const s=Object.assign({},t.textures[n].image);this.textures[n].source=new hu(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ln extends Z_{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class cm extends _n{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class $_ extends _n{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const xl=class xl{constructor(t,n,i,s,r,a,o,l,c,u,f,h,p,_,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,r,a,o,l,c,u,f,h,p,_,S,m)}set(t,n,i,s,r,a,o,l,c,u,f,h,p,_,S,m){const d=this.elements;return d[0]=t,d[4]=n,d[8]=i,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=_,d[11]=S,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xl().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const n=this.elements,i=t.elements,s=1/ar.setFromMatrixColumn(t,0).length(),r=1/ar.setFromMatrixColumn(t,1).length(),a=1/ar.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*r,n[5]=i[5]*r,n[6]=i[6]*r,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=a*u,p=a*f,_=o*u,S=o*f;n[0]=l*u,n[4]=-l*f,n[8]=c,n[1]=p+_*c,n[5]=h-S*c,n[9]=-o*l,n[2]=S-h*c,n[6]=_+p*c,n[10]=a*l}else if(t.order==="YXZ"){const h=l*u,p=l*f,_=c*u,S=c*f;n[0]=h+S*o,n[4]=_*o-p,n[8]=a*c,n[1]=a*f,n[5]=a*u,n[9]=-o,n[2]=p*o-_,n[6]=S+h*o,n[10]=a*l}else if(t.order==="ZXY"){const h=l*u,p=l*f,_=c*u,S=c*f;n[0]=h-S*o,n[4]=-a*f,n[8]=_+p*o,n[1]=p+_*o,n[5]=a*u,n[9]=S-h*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(t.order==="ZYX"){const h=a*u,p=a*f,_=o*u,S=o*f;n[0]=l*u,n[4]=_*c-p,n[8]=h*c+S,n[1]=l*f,n[5]=S*c+h,n[9]=p*c-_,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(t.order==="YZX"){const h=a*l,p=a*c,_=o*l,S=o*c;n[0]=l*u,n[4]=S-h*f,n[8]=_*f+p,n[1]=f,n[5]=a*u,n[9]=-o*u,n[2]=-c*u,n[6]=p*f+_,n[10]=h-S*f}else if(t.order==="XZY"){const h=a*l,p=a*c,_=o*l,S=o*c;n[0]=l*u,n[4]=-f,n[8]=c*u,n[1]=h*f+S,n[5]=a*u,n[9]=p*f-_,n[2]=_*f-p,n[6]=o*u,n[10]=S*f+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(J_,t,j_)}lookAt(t,n,i){const s=this.elements;return Un.subVectors(t,n),Un.lengthSq()===0&&(Un.z=1),Un.normalize(),is.crossVectors(i,Un),is.lengthSq()===0&&(Math.abs(i.z)===1?Un.x+=1e-4:Un.z+=1e-4,Un.normalize(),is.crossVectors(i,Un)),is.normalize(),io.crossVectors(Un,is),s[0]=is.x,s[4]=io.x,s[8]=Un.x,s[1]=is.y,s[5]=io.y,s[9]=Un.y,s[2]=is.z,s[6]=io.z,s[10]=Un.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,s=n.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],p=i[13],_=i[2],S=i[6],m=i[10],d=i[14],y=i[3],E=i[7],M=i[11],w=i[15],b=s[0],C=s[4],v=s[8],A=s[12],D=s[1],L=s[5],O=s[9],j=s[13],et=s[2],k=s[6],Z=s[10],z=s[14],nt=s[3],st=s[7],pt=s[11],gt=s[15];return r[0]=a*b+o*D+l*et+c*nt,r[4]=a*C+o*L+l*k+c*st,r[8]=a*v+o*O+l*Z+c*pt,r[12]=a*A+o*j+l*z+c*gt,r[1]=u*b+f*D+h*et+p*nt,r[5]=u*C+f*L+h*k+p*st,r[9]=u*v+f*O+h*Z+p*pt,r[13]=u*A+f*j+h*z+p*gt,r[2]=_*b+S*D+m*et+d*nt,r[6]=_*C+S*L+m*k+d*st,r[10]=_*v+S*O+m*Z+d*pt,r[14]=_*A+S*j+m*z+d*gt,r[3]=y*b+E*D+M*et+w*nt,r[7]=y*C+E*L+M*k+w*st,r[11]=y*v+E*O+M*Z+w*pt,r[15]=y*A+E*j+M*z+w*gt,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],p=t[14],_=t[3],S=t[7],m=t[11],d=t[15],y=l*p-c*h,E=o*p-c*f,M=o*h-l*f,w=a*p-c*u,b=a*h-l*u,C=a*f-o*u;return n*(S*y-m*E+d*M)-i*(_*y-m*w+d*b)+s*(_*E-S*w+d*C)-r*(_*M-S*b+m*C)}determinantAffine(){const t=this.elements,n=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],u=t[10];return n*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],p=t[11],_=t[12],S=t[13],m=t[14],d=t[15],y=n*o-i*a,E=n*l-s*a,M=n*c-r*a,w=i*l-s*o,b=i*c-r*o,C=s*c-r*l,v=u*S-f*_,A=u*m-h*_,D=u*d-p*_,L=f*m-h*S,O=f*d-p*S,j=h*d-p*m,et=y*j-E*O+M*L+w*D-b*A+C*v;if(et===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/et;return t[0]=(o*j-l*O+c*L)*k,t[1]=(s*O-i*j-r*L)*k,t[2]=(S*C-m*b+d*w)*k,t[3]=(h*b-f*C-p*w)*k,t[4]=(l*D-a*j-c*A)*k,t[5]=(n*j-s*D+r*A)*k,t[6]=(m*M-_*C-d*E)*k,t[7]=(u*C-h*M+p*E)*k,t[8]=(a*O-o*D+c*v)*k,t[9]=(i*D-n*O-r*v)*k,t[10]=(_*b-S*M+d*y)*k,t[11]=(f*M-u*b-p*y)*k,t[12]=(o*A-a*L-l*v)*k,t[13]=(n*L-i*A+s*v)*k,t[14]=(S*E-_*w-m*y)*k,t[15]=(u*w-f*E+h*y)*k,this}scale(t){const n=this.elements,i=t.x,s=t.y,r=t.z;return n[0]*=i,n[4]*=s,n[8]*=r,n[1]*=i,n[5]*=s,n[9]*=r,n[2]*=i,n[6]*=s,n[10]*=r,n[3]*=i,n[7]*=s,n[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),s=Math.sin(n),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){const s=this.elements,r=n._x,a=n._y,o=n._z,l=n._w,c=r+r,u=a+a,f=o+o,h=r*c,p=r*u,_=r*f,S=a*u,m=a*f,d=o*f,y=l*c,E=l*u,M=l*f,w=i.x,b=i.y,C=i.z;return s[0]=(1-(S+d))*w,s[1]=(p+M)*w,s[2]=(_-E)*w,s[3]=0,s[4]=(p-M)*b,s[5]=(1-(h+d))*b,s[6]=(m+y)*b,s[7]=0,s[8]=(_+E)*C,s[9]=(m-y)*C,s[10]=(1-(h+S))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),n.identity(),this;let a=ar.set(s[0],s[1],s[2]).length();const o=ar.set(s[4],s[5],s[6]).length(),l=ar.set(s[8],s[9],s[10]).length();r<0&&(a=-a),ai.copy(this);const c=1/a,u=1/o,f=1/l;return ai.elements[0]*=c,ai.elements[1]*=c,ai.elements[2]*=c,ai.elements[4]*=u,ai.elements[5]*=u,ai.elements[6]*=u,ai.elements[8]*=f,ai.elements[9]*=f,ai.elements[10]*=f,n.setFromRotationMatrix(ai),i.x=a,i.y=o,i.z=l,this}makePerspective(t,n,i,s,r,a,o=Ai,l=!1){const c=this.elements,u=2*r/(n-t),f=2*r/(i-s),h=(n+t)/(n-t),p=(i+s)/(i-s);let _,S;if(l)_=r/(a-r),S=a*r/(a-r);else if(o===Ai)_=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===sl)_=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,s,r,a,o=Ai,l=!1){const c=this.elements,u=2/(n-t),f=2/(i-s),h=-(n+t)/(n-t),p=-(i+s)/(i-s);let _,S;if(l)_=1/(a-r),S=a/(a-r);else if(o===Ai)_=-2/(a-r),S=-(a+r)/(a-r);else if(o===sl)_=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}};xl.prototype.isMatrix4=!0;let Le=xl;const ar=new P,ai=new Le,J_=new P(0,0,0),j_=new P(1,1,1),is=new P,io=new P,Un=new P,Of=new Le,Bf=new vs;class qs{constructor(t=0,n=0,i=0,s=qs.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(n){case"XYZ":this._y=Math.asin(Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Yt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return Of.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Of,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Bf.setFromEuler(this),this.setFromQuaternion(Bf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qs.DEFAULT_ORDER="XYZ";class hm{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Q_=0;const kf=new P,or=new vs,Bi=new Le,so=new P,ga=new P,t1=new P,e1=new vs,zf=new P(1,0,0),Gf=new P(0,1,0),Vf=new P(0,0,1),Hf={type:"added"},n1={type:"removed"},lr={type:"childadded",child:null},ic={type:"childremoved",child:null};class vn extends Ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Q_++}),this.uuid=qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vn.DEFAULT_UP.clone();const t=new P,n=new qs,i=new vs,s=new P(1,1,1);function r(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Le},normalMatrix:{value:new Bt}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=vn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return or.setFromAxisAngle(t,n),this.quaternion.multiply(or),this}rotateOnWorldAxis(t,n){return or.setFromAxisAngle(t,n),this.quaternion.premultiply(or),this}rotateX(t){return this.rotateOnAxis(zf,t)}rotateY(t){return this.rotateOnAxis(Gf,t)}rotateZ(t){return this.rotateOnAxis(Vf,t)}translateOnAxis(t,n){return kf.copy(t).applyQuaternion(this.quaternion),this.position.add(kf.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(zf,t)}translateY(t){return this.translateOnAxis(Gf,t)}translateZ(t){return this.translateOnAxis(Vf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Bi.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?so.copy(t):so.set(t,n,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ga.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bi.lookAt(ga,so,this.up):Bi.lookAt(so,ga,this.up),this.quaternion.setFromRotationMatrix(Bi),s&&(Bi.extractRotation(s.matrixWorld),or.setFromRotationMatrix(Bi),this.quaternion.premultiply(or.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Hf),lr.child=t,this.dispatchEvent(lr),lr.child=null):Qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(n1),ic.child=t,this.dispatchEvent(ic),ic.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Bi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Bi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Bi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Hf),lr.child=t,this.dispatchEvent(lr),lr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,n);if(a!==void 0)return a}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ga,t,t1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ga,e1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=n-r[0]*n-r[4]*i-r[8]*s,r[13]+=i-r[1]*n-r[5]*i-r[9]*s,r[14]+=s-r[2]*n-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n,i=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(n){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),f=a(t.shapes),h=a(t.skeletons),p=a(t.animations),_=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}vn.DEFAULT_UP=new P(0,1,0);vn.DEFAULT_MATRIX_AUTO_UPDATE=!0;vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Cn extends vn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const i1={type:"move"};class sc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Cn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Cn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Cn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const S of t.hand.values()){const m=n.getJointPose(S,i),d=this._getHandJoint(c,S);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=n.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(i1)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new Cn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const um={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ss={h:0,s:0,l:0},ro={h:0,s:0,l:0};function rc(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class Wt{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=ti){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=Kt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Kt.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=Kt.workingColorSpace){if(t=cu(t,1),n=Yt(n,0,1),i=Yt(i,0,1),n===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+n):i+n-i*n,a=2*i-r;this.r=rc(a,r,t+1/3),this.g=rc(a,r,t),this.b=rc(a,r,t-1/3)}return Kt.colorSpaceToWorking(this,s),this}setStyle(t,n=ti){function i(r){r!==void 0&&parseFloat(r)<1&&Ut("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,n);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,n);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,n);break;default:Ut("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(r,16),n);Ut("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=ti){const i=um[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Ut("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ki(t.r),this.g=Ki(t.g),this.b=Ki(t.b),this}copyLinearToSRGB(t){return this.r=Dr(t.r),this.g=Dr(t.g),this.b=Dr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ti){return Kt.workingToColorSpace(fn.copy(this),t),Math.round(Yt(fn.r*255,0,255))*65536+Math.round(Yt(fn.g*255,0,255))*256+Math.round(Yt(fn.b*255,0,255))}getHexString(t=ti){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Kt.workingColorSpace){Kt.workingToColorSpace(fn.copy(this),n);const i=fn.r,s=fn.g,r=fn.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,n=Kt.workingColorSpace){return Kt.workingToColorSpace(fn.copy(this),n),t.r=fn.r,t.g=fn.g,t.b=fn.b,t}getStyle(t=ti){Kt.workingToColorSpace(fn.copy(this),t);const n=fn.r,i=fn.g,s=fn.b;return t!==ti?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(ss),this.setHSL(ss.h+t,ss.s+n,ss.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(ss),t.getHSL(ro);const i=La(ss.h,ro.h,n),s=La(ss.s,ro.s,n),r=La(ss.l,ro.l,n);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*n+r[3]*i+r[6]*s,this.g=r[1]*n+r[4]*i+r[7]*s,this.b=r[2]*n+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const fn=new Wt;Wt.NAMES=um;class s1 extends vn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qs,this.environmentIntensity=1,this.environmentRotation=new qs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const oi=new P,ki=new P,ac=new P,zi=new P,cr=new P,hr=new P,Wf=new P,oc=new P,lc=new P,cc=new P,hc=new Fe,uc=new Fe,fc=new Fe;class kn{constructor(t=new P,n=new P,i=new P){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),oi.subVectors(t,n),s.cross(oi);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,n,i,s,r){oi.subVectors(s,n),ki.subVectors(i,n),ac.subVectors(t,n);const a=oi.dot(oi),o=oi.dot(ki),l=oi.dot(ac),c=ki.dot(ki),u=ki.dot(ac),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const h=1/f,p=(c*l-o*u)*h,_=(a*u-o*l)*h;return r.set(1-p-_,_,p)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,zi)===null?!1:zi.x>=0&&zi.y>=0&&zi.x+zi.y<=1}static getInterpolation(t,n,i,s,r,a,o,l){return this.getBarycoord(t,n,i,s,zi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,zi.x),l.addScaledVector(a,zi.y),l.addScaledVector(o,zi.z),l)}static getInterpolatedAttribute(t,n,i,s,r,a){return hc.setScalar(0),uc.setScalar(0),fc.setScalar(0),hc.fromBufferAttribute(t,n),uc.fromBufferAttribute(t,i),fc.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(hc,r.x),a.addScaledVector(uc,r.y),a.addScaledVector(fc,r.z),a}static isFrontFacing(t,n,i,s){return oi.subVectors(i,n),ki.subVectors(t,n),oi.cross(ki).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return oi.subVectors(this.c,this.b),ki.subVectors(this.a,this.b),oi.cross(ki).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return kn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return kn.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,r){return kn.getInterpolation(t,this.a,this.b,this.c,n,i,s,r)}containsPoint(t){return kn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return kn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,s=this.b,r=this.c;let a,o;cr.subVectors(s,i),hr.subVectors(r,i),oc.subVectors(t,i);const l=cr.dot(oc),c=hr.dot(oc);if(l<=0&&c<=0)return n.copy(i);lc.subVectors(t,s);const u=cr.dot(lc),f=hr.dot(lc);if(u>=0&&f<=u)return n.copy(s);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),n.copy(i).addScaledVector(cr,a);cc.subVectors(t,r);const p=cr.dot(cc),_=hr.dot(cc);if(_>=0&&p<=_)return n.copy(r);const S=p*c-l*_;if(S<=0&&c>=0&&_<=0)return o=c/(c-_),n.copy(i).addScaledVector(hr,o);const m=u*_-p*f;if(m<=0&&f-u>=0&&p-_>=0)return Wf.subVectors(r,s),o=(f-u)/(f-u+(p-_)),n.copy(s).addScaledVector(Wf,o);const d=1/(m+S+h);return a=S*d,o=h*d,n.copy(i).addScaledVector(cr,a).addScaledVector(hr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Ha{constructor(t=new P(1/0,1/0,1/0),n=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(li.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(li.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=li.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(n===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,li):li.fromBufferAttribute(r,a),li.applyMatrix4(t.matrixWorld),this.expandByPoint(li);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ao.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ao.copy(i.boundingBox)),ao.applyMatrix4(t.matrixWorld),this.union(ao)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,li),li.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(_a),oo.subVectors(this.max,_a),ur.subVectors(t.a,_a),fr.subVectors(t.b,_a),dr.subVectors(t.c,_a),rs.subVectors(fr,ur),as.subVectors(dr,fr),bs.subVectors(ur,dr);let n=[0,-rs.z,rs.y,0,-as.z,as.y,0,-bs.z,bs.y,rs.z,0,-rs.x,as.z,0,-as.x,bs.z,0,-bs.x,-rs.y,rs.x,0,-as.y,as.x,0,-bs.y,bs.x,0];return!dc(n,ur,fr,dr,oo)||(n=[1,0,0,0,1,0,0,0,1],!dc(n,ur,fr,dr,oo))?!1:(lo.crossVectors(rs,as),n=[lo.x,lo.y,lo.z],dc(n,ur,fr,dr,oo))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,li).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(li).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Gi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Gi=[new P,new P,new P,new P,new P,new P,new P,new P],li=new P,ao=new Ha,ur=new P,fr=new P,dr=new P,rs=new P,as=new P,bs=new P,_a=new P,oo=new P,lo=new P,Ts=new P;function dc(e,t,n,i,s){for(let r=0,a=e.length-3;r<=a;r+=3){Ts.fromArray(e,r);const o=s.x*Math.abs(Ts.x)+s.y*Math.abs(Ts.y)+s.z*Math.abs(Ts.z),l=t.dot(Ts),c=n.dot(Ts),u=i.dot(Ts);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const He=new P,co=new yt;let r1=0;class ui extends Ss{constructor(t,n,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:r1++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=wh,this.updateRanges=[],this.gpuType=Ti,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)co.fromBufferAttribute(this,n),co.applyMatrix3(t),this.setXY(n,co.x,co.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)He.fromBufferAttribute(this,n),He.applyMatrix3(t),this.setXYZ(n,He.x,He.y,He.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)He.fromBufferAttribute(this,n),He.applyMatrix4(t),this.setXYZ(n,He.x,He.y,He.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)He.fromBufferAttribute(this,n),He.applyNormalMatrix(t),this.setXYZ(n,He.x,He.y,He.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)He.fromBufferAttribute(this,n),He.transformDirection(t),this.setXYZ(n,He.x,He.y,He.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=ci(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=ce(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=ci(n,this.array)),n}setX(t,n){return this.normalized&&(n=ce(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=ci(n,this.array)),n}setY(t,n){return this.normalized&&(n=ce(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=ci(n,this.array)),n}setZ(t,n){return this.normalized&&(n=ce(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=ci(n,this.array)),n}setW(t,n){return this.normalized&&(n=ce(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=ce(n,this.array),i=ce(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=ce(n,this.array),i=ce(i,this.array),s=ce(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,r){return t*=this.itemSize,this.normalized&&(n=ce(n,this.array),i=ce(i,this.array),s=ce(s,this.array),r=ce(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==wh&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class fm extends ui{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class dm extends ui{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class ee extends ui{constructor(t,n,i){super(new Float32Array(t),n,i)}}const a1=new Ha,va=new P,pc=new P;class Wa{constructor(t=new P,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):a1.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;va.subVectors(t,this.center);const n=va.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(va,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(pc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(va.copy(t.center).add(pc)),this.expandByPoint(va.copy(t.center).sub(pc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let o1=0;const $n=new Le,mc=new vn,pr=new P,Nn=new Ha,xa=new Ha,sn=new P;class ae extends Ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:o1++}),this.uuid=qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(T_(t)?dm:fm)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Bt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return $n.makeRotationFromQuaternion(t),this.applyMatrix4($n),this}rotateX(t){return $n.makeRotationX(t),this.applyMatrix4($n),this}rotateY(t){return $n.makeRotationY(t),this.applyMatrix4($n),this}rotateZ(t){return $n.makeRotationZ(t),this.applyMatrix4($n),this}translate(t,n,i){return $n.makeTranslation(t,n,i),this.applyMatrix4($n),this}scale(t,n,i){return $n.makeScale(t,n,i),this.applyMatrix4($n),this}lookAt(t){return mc.lookAt(t),mc.updateMatrix(),this.applyMatrix4(mc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pr).negate(),this.translate(pr.x,pr.y,pr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ee(i,3))}else{const i=Math.min(t.length,n.count);for(let s=0;s<i;s++){const r=t[s];n.setXYZ(s,r.x,r.y,r.z||0)}t.length>n.count&&Ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ha);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){const r=n[i];Nn.setFromBufferAttribute(r),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wa);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const i=this.boundingSphere.center;if(Nn.setFromBufferAttribute(t),n)for(let r=0,a=n.length;r<a;r++){const o=n[r];xa.setFromBufferAttribute(o),this.morphTargetsRelative?(sn.addVectors(Nn.min,xa.min),Nn.expandByPoint(sn),sn.addVectors(Nn.max,xa.max),Nn.expandByPoint(sn)):(Nn.expandByPoint(xa.min),Nn.expandByPoint(xa.max))}Nn.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)sn.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(sn));if(n)for(let r=0,a=n.length;r<a;r++){const o=n[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)sn.fromBufferAttribute(o,c),l&&(pr.fromBufferAttribute(t,c),sn.add(pr)),s=Math.max(s,i.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,s=n.normal,r=n.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new ui(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<i.count;v++)o[v]=new P,l[v]=new P;const c=new P,u=new P,f=new P,h=new yt,p=new yt,_=new yt,S=new P,m=new P;function d(v,A,D){c.fromBufferAttribute(i,v),u.fromBufferAttribute(i,A),f.fromBufferAttribute(i,D),h.fromBufferAttribute(r,v),p.fromBufferAttribute(r,A),_.fromBufferAttribute(r,D),u.sub(c),f.sub(c),p.sub(h),_.sub(h);const L=1/(p.x*_.y-_.x*p.y);isFinite(L)&&(S.copy(u).multiplyScalar(_.y).addScaledVector(f,-p.y).multiplyScalar(L),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(L),o[v].add(S),o[A].add(S),o[D].add(S),l[v].add(m),l[A].add(m),l[D].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let v=0,A=y.length;v<A;++v){const D=y[v],L=D.start,O=D.count;for(let j=L,et=L+O;j<et;j+=3)d(t.getX(j+0),t.getX(j+1),t.getX(j+2))}const E=new P,M=new P,w=new P,b=new P;function C(v){w.fromBufferAttribute(s,v),b.copy(w);const A=o[v];E.copy(A),E.sub(w.multiplyScalar(w.dot(A))).normalize(),M.crossVectors(b,A);const L=M.dot(l[v])<0?-1:1;a.setXYZW(v,E.x,E.y,E.z,L)}for(let v=0,A=y.length;v<A;++v){const D=y[v],L=D.start,O=D.count;for(let j=L,et=L+O;j<et;j+=3)C(t.getX(j+0)),C(t.getX(j+1)),C(t.getX(j+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new ui(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,u=new P,f=new P;if(t)for(let h=0,p=t.count;h<p;h+=3){const _=t.getX(h+0),S=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(n,_),r.fromBufferAttribute(n,S),a.fromBufferAttribute(n,m),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=n.count;h<p;h+=3)s.fromBufferAttribute(n,h+0),r.fromBufferAttribute(n,h+1),a.fromBufferAttribute(n,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)sn.fromBufferAttribute(t,n),sn.normalize(),t.setXYZ(n,sn.x,sn.y,sn.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let p=0,_=0;for(let S=0,m=l.length;S<m;S++){o.isInterleavedBufferAttribute?p=l[S]*o.data.stride+o.offset:p=l[S]*u;for(let d=0;d<u;d++)h[_++]=c[p++]}return new ui(h,u,f)}if(this.index===null)return Ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new ae,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,i);n.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],p=t(h,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];u.push(p.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(n))}const r=t.morphAttributes;for(const c in r){const u=[],f=r[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class l1{constructor(t,n){this.isInterleavedBuffer=!0,this.array=t,this.stride=n,this.count=t!==void 0?t.length/n:0,this.usage=wh,this.updateRanges=[],this.version=0,this.uuid=qi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,n,i){t*=this.stride,i*=n.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=n.array[i+s];return this}set(t,n=0){return this.array.set(t,n),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const yn=new P;class ol{constructor(t,n,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=n,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let n=0,i=this.data.count;n<i;n++)yn.fromBufferAttribute(this,n),yn.applyMatrix4(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)yn.fromBufferAttribute(this,n),yn.applyNormalMatrix(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)yn.fromBufferAttribute(this,n),yn.transformDirection(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}getComponent(t,n){let i=this.array[t*this.data.stride+this.offset+n];return this.normalized&&(i=ci(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=ce(i,this.array)),this.data.array[t*this.data.stride+this.offset+n]=i,this}setX(t,n){return this.normalized&&(n=ce(n,this.array)),this.data.array[t*this.data.stride+this.offset]=n,this}setY(t,n){return this.normalized&&(n=ce(n,this.array)),this.data.array[t*this.data.stride+this.offset+1]=n,this}setZ(t,n){return this.normalized&&(n=ce(n,this.array)),this.data.array[t*this.data.stride+this.offset+2]=n,this}setW(t,n){return this.normalized&&(n=ce(n,this.array)),this.data.array[t*this.data.stride+this.offset+3]=n,this}getX(t){let n=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(n=ci(n,this.array)),n}getY(t){let n=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(n=ci(n,this.array)),n}getZ(t){let n=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(n=ci(n,this.array)),n}getW(t){let n=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(n=ci(n,this.array)),n}setXY(t,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(n=ce(n,this.array),i=ce(i,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=i,this}setXYZ(t,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(n=ce(n,this.array),i=ce(i,this.array),s=ce(s,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,n,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(n=ce(n,this.array),i=ce(i,this.array),s=ce(s,this.array),r=ce(r,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){al("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)n.push(this.data.array[s+r])}return new ui(new this.array.constructor(n),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ol(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){al("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)n.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let c1=0;class Js extends Ss{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:c1++}),this.uuid=qi(),this.name="",this.type="Material",this.blending=Cr,this.side=_s,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zc,this.blendDst=Gc,this.blendEquation=Ds,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=Nr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sr,this.stencilZFail=sr,this.stencilZPass=sr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){Ut(`Material: parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){Ut(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Cr&&(i.blending=this.blending),this.side!==_s&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==zc&&(i.blendSrc=this.blendSrc),this.blendDst!==Gc&&(i.blendDst=this.blendDst),this.blendEquation!==Ds&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Nr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==sr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==sr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==sr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(n){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Wt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new yt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new yt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const s=n.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=n[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class pm extends Js{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let mr;const Ma=new P,gr=new P,_r=new P,vr=new yt,Sa=new yt,mm=new Le,ho=new P,ya=new P,uo=new P,Xf=new yt,gc=new yt,Yf=new yt;class h1 extends vn{constructor(t=new pm){if(super(),this.isSprite=!0,this.type="Sprite",mr===void 0){mr=new ae;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new l1(n,5);mr.setIndex([0,1,2,0,2,3]),mr.setAttribute("position",new ol(i,3,0,!1)),mr.setAttribute("uv",new ol(i,2,3,!1))}this.geometry=mr,this.material=t,this.center=new yt(.5,.5),this.count=1}raycast(t,n){t.camera===null&&Qt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),gr.setFromMatrixScale(this.matrixWorld),mm.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),_r.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&gr.multiplyScalar(-_r.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const a=this.center;fo(ho.set(-.5,-.5,0),_r,a,gr,s,r),fo(ya.set(.5,-.5,0),_r,a,gr,s,r),fo(uo.set(.5,.5,0),_r,a,gr,s,r),Xf.set(0,0),gc.set(1,0),Yf.set(1,1);let o=t.ray.intersectTriangle(ho,ya,uo,!1,Ma);if(o===null&&(fo(ya.set(-.5,.5,0),_r,a,gr,s,r),gc.set(0,1),o=t.ray.intersectTriangle(ho,uo,ya,!1,Ma),o===null))return;const l=t.ray.origin.distanceTo(Ma);l<t.near||l>t.far||n.push({distance:l,point:Ma.clone(),uv:kn.getInterpolation(Ma,ho,ya,uo,Xf,gc,Yf,new yt),face:null,object:this})}copy(t,n){return super.copy(t,n),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function fo(e,t,n,i,s,r){vr.subVectors(e,n).addScalar(.5).multiply(i),s!==void 0?(Sa.x=r*vr.x-s*vr.y,Sa.y=s*vr.x+r*vr.y):Sa.copy(vr),e.copy(t),e.x+=Sa.x,e.y+=Sa.y,e.applyMatrix4(mm)}const Vi=new P,_c=new P,po=new P,os=new P,vc=new P,mo=new P,xc=new P;class Sl{constructor(t=new P,n=new P(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Vi)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Vi.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Vi.copy(this.origin).addScaledVector(this.direction,n),Vi.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){_c.copy(t).add(n).multiplyScalar(.5),po.copy(n).sub(t).normalize(),os.copy(this.origin).sub(_c);const r=t.distanceTo(n)*.5,a=-this.direction.dot(po),o=os.dot(this.direction),l=-os.dot(po),c=os.lengthSq(),u=Math.abs(1-a*a);let f,h,p,_;if(u>0)if(f=a*l-o,h=a*o-l,_=r*u,f>=0)if(h>=-_)if(h<=_){const S=1/u;f*=S,h*=S,p=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h<=-_?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c):h<=_?(f=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(_c).addScaledVector(po,h),p}intersectSphere(t,n){Vi.subVectors(t.center,this.origin);const i=Vi.dot(this.direction),s=Vi.dot(Vi)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,Vi)!==null}intersectTriangle(t,n,i,s,r){vc.subVectors(n,t),mo.subVectors(i,t),xc.crossVectors(vc,mo);let a=this.direction.dot(xc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;os.subVectors(this.origin,t);const l=o*this.direction.dot(mo.crossVectors(os,mo));if(l<0)return null;const c=o*this.direction.dot(vc.cross(os));if(c<0||l+c>a)return null;const u=-o*os.dot(xc);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Yi extends Js{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qs,this.combine=qp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const qf=new Le,As=new Sl,go=new Wa,Kf=new P,_o=new P,vo=new P,xo=new P,Mc=new P,Mo=new P,Zf=new P,So=new P;class pn extends vn{constructor(t=new ae,n=new Yi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,n){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Mo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],f=r[l];u!==0&&(Mc.fromBufferAttribute(f,t),a?Mo.addScaledVector(Mc,u):Mo.addScaledVector(Mc.sub(n),u))}n.add(Mo)}return n}raycast(t,n){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),go.copy(i.boundingSphere),go.applyMatrix4(r),As.copy(t.ray).recast(t.near),!(go.containsPoint(As.origin)===!1&&(As.intersectSphere(go,Kf)===null||As.origin.distanceToSquared(Kf)>(t.far-t.near)**2))&&(qf.copy(r).invert(),As.copy(t.ray).applyMatrix4(qf),!(i.boundingBox!==null&&As.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,As)))}_computeIntersections(t,n,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,S=h.length;_<S;_++){const m=h[_],d=a[m.materialIndex],y=Math.max(m.start,p.start),E=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let M=y,w=E;M<w;M+=3){const b=o.getX(M),C=o.getX(M+1),v=o.getX(M+2);s=yo(this,d,t,i,c,u,f,b,C,v),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{const _=Math.max(0,p.start),S=Math.min(o.count,p.start+p.count);for(let m=_,d=S;m<d;m+=3){const y=o.getX(m),E=o.getX(m+1),M=o.getX(m+2);s=yo(this,a,t,i,c,u,f,y,E,M),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,S=h.length;_<S;_++){const m=h[_],d=a[m.materialIndex],y=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=y,w=E;M<w;M+=3){const b=M,C=M+1,v=M+2;s=yo(this,d,t,i,c,u,f,b,C,v),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{const _=Math.max(0,p.start),S=Math.min(l.count,p.start+p.count);for(let m=_,d=S;m<d;m+=3){const y=m,E=m+1,M=m+2;s=yo(this,a,t,i,c,u,f,y,E,M),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}}}function u1(e,t,n,i,s,r,a,o){let l;if(t.side===Pn?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===_s,o),l===null)return null;So.copy(o),So.applyMatrix4(e.matrixWorld);const c=n.ray.origin.distanceTo(So);return c<n.near||c>n.far?null:{distance:c,point:So.clone(),object:e}}function yo(e,t,n,i,s,r,a,o,l,c){e.getVertexPosition(o,_o),e.getVertexPosition(l,vo),e.getVertexPosition(c,xo);const u=u1(e,t,n,i,_o,vo,xo,Zf);if(u){const f=new P;kn.getBarycoord(Zf,_o,vo,xo,f),s&&(u.uv=kn.getInterpolatedAttribute(s,o,l,c,f,new yt)),r&&(u.uv1=kn.getInterpolatedAttribute(r,o,l,c,f,new yt)),a&&(u.normal=kn.getInterpolatedAttribute(a,o,l,c,f,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new P,materialIndex:0};kn.getNormal(_o,vo,xo,h.normal),u.face=h,u.barycoord=f}return u}class f1 extends _n{constructor(t=null,n=1,i=1,s,r,a,o,l,c=on,u=on,f,h){super(null,a,o,l,c,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Sc=new P,d1=new P,p1=new Bt;class us{constructor(t=new P(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const s=Sc.subVectors(i,n).cross(d1.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,i=!0){const s=t.delta(Sc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:n.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||p1.getNormalMatrix(t),s=this.coplanarPoint(Sc).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ws=new Wa,m1=new yt(.5,.5),Eo=new P;class gm{constructor(t=new us,n=new us,i=new us,s=new us,r=new us,a=new us){this.planes=[t,n,i,s,r,a]}set(t,n,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Ai,i=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],f=r[5],h=r[6],p=r[7],_=r[8],S=r[9],m=r[10],d=r[11],y=r[12],E=r[13],M=r[14],w=r[15];if(s[0].setComponents(c-a,p-u,d-_,w-y).normalize(),s[1].setComponents(c+a,p+u,d+_,w+y).normalize(),s[2].setComponents(c+o,p+f,d+S,w+E).normalize(),s[3].setComponents(c-o,p-f,d-S,w-E).normalize(),i)s[4].setComponents(l,h,m,M).normalize(),s[5].setComponents(c-l,p-h,d-m,w-M).normalize();else if(s[4].setComponents(c-l,p-h,d-m,w-M).normalize(),n===Ai)s[5].setComponents(c+l,p+h,d+m,w+M).normalize();else if(n===sl)s[5].setComponents(l,h,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ws.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ws.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ws)}intersectsSprite(t){ws.center.set(0,0,0);const n=m1.distanceTo(t.center);return ws.radius=.7071067811865476+n,ws.applyMatrix4(t.matrixWorld),this.intersectsSphere(ws)}intersectsSphere(t){const n=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(n[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const s=n[i];if(Eo.x=s.normal.x>0?t.max.x:t.min.x,Eo.y=s.normal.y>0?t.max.y:t.min.y,Eo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Eo)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class uu extends Js{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Wt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ll=new P,cl=new P,$f=new Le,Ea=new Sl,bo=new Wa,yc=new P,Jf=new P;class wn extends vn{constructor(t=new ae,n=new uu){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[0];for(let s=1,r=n.count;s<r;s++)ll.fromBufferAttribute(n,s-1),cl.fromBufferAttribute(n,s),i[s]=i[s-1],i[s]+=ll.distanceTo(cl);t.setAttribute("lineDistance",new ee(i,1))}else Ut("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),bo.copy(i.boundingSphere),bo.applyMatrix4(s),bo.radius+=r,t.ray.intersectsSphere(bo)===!1)return;$f.copy(s).invert(),Ea.copy(t.ray).applyMatrix4($f);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const p=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let S=p,m=_-1;S<m;S+=c){const d=u.getX(S),y=u.getX(S+1),E=To(this,t,Ea,l,d,y,S);E&&n.push(E)}if(this.isLineLoop){const S=u.getX(_-1),m=u.getX(p),d=To(this,t,Ea,l,S,m,_-1);d&&n.push(d)}}else{const p=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let S=p,m=_-1;S<m;S+=c){const d=To(this,t,Ea,l,S,S+1,S);d&&n.push(d)}if(this.isLineLoop){const S=To(this,t,Ea,l,_-1,p,_-1);S&&n.push(S)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function To(e,t,n,i,s,r,a){const o=e.geometry.attributes.position;if(ll.fromBufferAttribute(o,s),cl.fromBufferAttribute(o,r),n.distanceSqToSegment(ll,cl,yc,Jf)>i)return;yc.applyMatrix4(e.matrixWorld);const c=t.ray.origin.distanceTo(yc);if(!(c<t.near||c>t.far))return{distance:c,point:Jf.clone().applyMatrix4(e.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:e}}const jf=new P,Qf=new P;class Is extends wn{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[];for(let s=0,r=n.count;s<r;s+=2)jf.fromBufferAttribute(n,s),Qf.fromBufferAttribute(n,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+jf.distanceTo(Qf);t.setAttribute("lineDistance",new ee(i,1))}else Ut("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class fu extends Js{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const td=new Le,Ch=new Sl,Ao=new Wa,wo=new P;class _m extends vn{constructor(t=new ae,n=new fu){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ao.copy(i.boundingSphere),Ao.applyMatrix4(s),Ao.radius+=r,t.ray.intersectsSphere(Ao)===!1)return;td.copy(s).invert(),Ch.copy(t.ray).applyMatrix4(td);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let _=h,S=p;_<S;_++){const m=c.getX(_);wo.fromBufferAttribute(f,m),ed(wo,m,l,s,t,n,this)}}else{const h=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let _=h,S=p;_<S;_++)wo.fromBufferAttribute(f,_),ed(wo,_,l,s,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ed(e,t,n,i,s,r,a){const o=Ch.distanceSqToPoint(e);if(o<n){const l=new P;Ch.closestPointToPoint(e,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class vm extends _n{constructor(t=[],n=Xs,i,s,r,a,o,l,c,u){super(t,n,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class nd extends _n{constructor(t,n,i,s,r,a,o,l,c){super(t,n,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Or extends _n{constructor(t,n,i=Li,s,r,a,o=on,l=on,c,u=Zi,f=1){if(u!==Zi&&u!==Os)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:n,depth:f};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new hu(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class g1 extends Or{constructor(t,n=Li,i=Xs,s,r,a=on,o=on,l,c=Zi){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,n,i,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class xm extends _n{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Xa extends ae{constructor(t=1,n=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,p=0;_("z","y","x",-1,-1,i,n,t,a,r,0),_("z","y","x",1,-1,i,n,-t,a,r,1),_("x","z","y",1,1,t,i,n,s,a,2),_("x","z","y",1,-1,t,i,-n,s,a,3),_("x","y","z",1,-1,t,n,i,s,r,4),_("x","y","z",-1,-1,t,n,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new ee(c,3)),this.setAttribute("normal",new ee(u,3)),this.setAttribute("uv",new ee(f,2));function _(S,m,d,y,E,M,w,b,C,v,A){const D=M/C,L=w/v,O=M/2,j=w/2,et=b/2,k=C+1,Z=v+1;let z=0,nt=0;const st=new P;for(let pt=0;pt<Z;pt++){const gt=pt*L-j;for(let xt=0;xt<k;xt++){const Zt=xt*D-O;st[S]=Zt*y,st[m]=gt*E,st[d]=et,c.push(st.x,st.y,st.z),st[S]=0,st[m]=0,st[d]=b>0?1:-1,u.push(st.x,st.y,st.z),f.push(xt/C),f.push(1-pt/v),z+=1}}for(let pt=0;pt<v;pt++)for(let gt=0;gt<C;gt++){const xt=h+gt+k*pt,Zt=h+gt+k*(pt+1),_e=h+(gt+1)+k*(pt+1),$t=h+(gt+1)+k*pt;l.push(xt,Zt,$t),l.push(Zt,_e,$t),nt+=6}o.addGroup(p,nt,A),p+=nt,h+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xa(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class yl extends ae{constructor(t=1,n=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:n,thetaStart:i,thetaLength:s},n=Math.max(3,n);const r=[],a=[],o=[],l=[],c=new P,u=new yt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=n;f++,h+=3){const p=i+f/n*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/t+1)/2,u.y=(a[h+1]/t+1)/2,l.push(u.x,u.y)}for(let f=1;f<=n;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new ee(a,3)),this.setAttribute("normal",new ee(o,3)),this.setAttribute("uv",new ee(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class jr extends ae{constructor(t=[],n=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:i,detail:s};const r=[],a=[];o(s),c(i),u(),this.setAttribute("position",new ee(r,3)),this.setAttribute("normal",new ee(r.slice(),3)),this.setAttribute("uv",new ee(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const E=new P,M=new P,w=new P;for(let b=0;b<n.length;b+=3)p(n[b+0],E),p(n[b+1],M),p(n[b+2],w),l(E,M,w,y)}function l(y,E,M,w){const b=w+1,C=[];for(let v=0;v<=b;v++){C[v]=[];const A=y.clone().lerp(M,v/b),D=E.clone().lerp(M,v/b),L=b-v;for(let O=0;O<=L;O++)O===0&&v===b?C[v][O]=A:C[v][O]=A.clone().lerp(D,O/L)}for(let v=0;v<b;v++)for(let A=0;A<2*(b-v)-1;A++){const D=Math.floor(A/2);A%2===0?(h(C[v][D+1]),h(C[v+1][D]),h(C[v][D])):(h(C[v][D+1]),h(C[v+1][D+1]),h(C[v+1][D]))}}function c(y){const E=new P;for(let M=0;M<r.length;M+=3)E.x=r[M+0],E.y=r[M+1],E.z=r[M+2],E.normalize().multiplyScalar(y),r[M+0]=E.x,r[M+1]=E.y,r[M+2]=E.z}function u(){const y=new P;for(let E=0;E<r.length;E+=3){y.x=r[E+0],y.y=r[E+1],y.z=r[E+2];const M=m(y)/2/Math.PI+.5,w=d(y)/Math.PI+.5;a.push(M,1-w)}_(),f()}function f(){for(let y=0;y<a.length;y+=6){const E=a[y+0],M=a[y+2],w=a[y+4],b=Math.max(E,M,w),C=Math.min(E,M,w);b>.9&&C<.1&&(E<.2&&(a[y+0]+=1),M<.2&&(a[y+2]+=1),w<.2&&(a[y+4]+=1))}}function h(y){r.push(y.x,y.y,y.z)}function p(y,E){const M=y*3;E.x=t[M+0],E.y=t[M+1],E.z=t[M+2]}function _(){const y=new P,E=new P,M=new P,w=new P,b=new yt,C=new yt,v=new yt;for(let A=0,D=0;A<r.length;A+=9,D+=6){y.set(r[A+0],r[A+1],r[A+2]),E.set(r[A+3],r[A+4],r[A+5]),M.set(r[A+6],r[A+7],r[A+8]),b.set(a[D+0],a[D+1]),C.set(a[D+2],a[D+3]),v.set(a[D+4],a[D+5]),w.copy(y).add(E).add(M).divideScalar(3);const L=m(w);S(b,D+0,y,L),S(C,D+2,E,L),S(v,D+4,M,L)}}function S(y,E,M,w){w<0&&y.x===1&&(a[E]=y.x-1),M.x===0&&M.z===0&&(a[E]=w/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function d(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jr(t.vertices,t.indices,t.radius,t.detail)}}class du extends jr{constructor(t=1,n=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,n),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new du(t.radius,t.detail)}}const Ro=new P,Co=new P,Ec=new P,Po=new kn;class Us extends ae{constructor(t=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:n},t!==null){const s=Math.pow(10,4),r=Math.cos(Lr*n),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],f=new Array(3),h={},p=[];for(let _=0;_<l;_+=3){a?(c[0]=a.getX(_),c[1]=a.getX(_+1),c[2]=a.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:S,b:m,c:d}=Po;if(S.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),d.fromBufferAttribute(o,c[2]),Po.getNormal(Ec),f[0]=`${Math.round(S.x*s)},${Math.round(S.y*s)},${Math.round(S.z*s)}`,f[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,f[2]=`${Math.round(d.x*s)},${Math.round(d.y*s)},${Math.round(d.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let y=0;y<3;y++){const E=(y+1)%3,M=f[y],w=f[E],b=Po[u[y]],C=Po[u[E]],v=`${M}_${w}`,A=`${w}_${M}`;A in h&&h[A]?(Ec.dot(h[A].normal)<=r&&(p.push(b.x,b.y,b.z),p.push(C.x,C.y,C.z)),h[A]=null):v in h||(h[v]={index0:c[y],index1:c[E],normal:Ec.clone()})}}for(const _ in h)if(h[_]){const{index0:S,index1:m}=h[_];Ro.fromBufferAttribute(o,S),Co.fromBufferAttribute(o,m),p.push(Ro.x,Ro.y,Ro.z),p.push(Co.x,Co.y,Co.z)}this.setAttribute("position",new ee(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Hi extends jr{constructor(t=1,n=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new Hi(t.radius,t.detail)}}class Ba extends jr{constructor(t=1,n=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,n),this.type="OctahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new Ba(t.radius,t.detail)}}class El extends ae{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};const r=t/2,a=n/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,f=t/o,h=n/l,p=[],_=[],S=[],m=[];for(let d=0;d<u;d++){const y=d*h-a;for(let E=0;E<c;E++){const M=E*f-r;_.push(M,-y,0),S.push(0,0,1),m.push(E/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let y=0;y<o;y++){const E=y+c*d,M=y+c*(d+1),w=y+1+c*(d+1),b=y+1+c*d;p.push(E,M,b),p.push(M,w,b)}this.setIndex(p),this.setAttribute("position",new ee(_,3)),this.setAttribute("normal",new ee(S,3)),this.setAttribute("uv",new ee(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new El(t.width,t.height,t.widthSegments,t.heightSegments)}}class pu extends ae{constructor(t=.5,n=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:n,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let f=t;const h=(n-t)/s,p=new P,_=new yt;for(let S=0;S<=s;S++){for(let m=0;m<=i;m++){const d=r+m/i*a;p.x=f*Math.cos(d),p.y=f*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),_.x=(p.x/n+1)/2,_.y=(p.y/n+1)/2,u.push(_.x,_.y)}f+=h}for(let S=0;S<s;S++){const m=S*(i+1);for(let d=0;d<i;d++){const y=d+m,E=y,M=y+i+1,w=y+i+2,b=y+1;o.push(E,M,b),o.push(M,w,b)}}this.setIndex(o),this.setAttribute("position",new ee(l,3)),this.setAttribute("normal",new ee(c,3)),this.setAttribute("uv",new ee(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pu(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class hl extends ae{constructor(t=1,n=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new P,h=new P,p=[],_=[],S=[],m=[];for(let d=0;d<=i;d++){const y=[],E=d/i,M=a+E*o,w=t*Math.cos(M),b=Math.sqrt(t*t-w*w);let C=0;d===0&&a===0?C=.5/n:d===i&&l===Math.PI&&(C=-.5/n);for(let v=0;v<=n;v++){const A=v/n,D=s+A*r;f.x=-b*Math.cos(D),f.y=w,f.z=b*Math.sin(D),_.push(f.x,f.y,f.z),h.copy(f).normalize(),S.push(h.x,h.y,h.z),m.push(A+C,1-E),y.push(c++)}u.push(y)}for(let d=0;d<i;d++)for(let y=0;y<n;y++){const E=u[d][y+1],M=u[d][y],w=u[d+1][y],b=u[d+1][y+1];(d!==0||a>0)&&p.push(E,M,b),(d!==i-1||l<Math.PI)&&p.push(M,w,b)}this.setIndex(p),this.setAttribute("position",new ee(_,3)),this.setAttribute("normal",new ee(S,3)),this.setAttribute("uv",new ee(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hl(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class mu extends jr{constructor(t=1,n=0){const i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,s,t,n),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new mu(t.radius,t.detail)}}class gu extends ae{constructor(t=1,n=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);const l=[],c=[],u=[],f=[],h=new P,p=new P,_=new P;for(let S=0;S<=i;S++){const m=a+S/i*o;for(let d=0;d<=s;d++){const y=d/s*r;p.x=(t+n*Math.cos(m))*Math.cos(y),p.y=(t+n*Math.cos(m))*Math.sin(y),p.z=n*Math.sin(m),c.push(p.x,p.y,p.z),h.x=t*Math.cos(y),h.y=t*Math.sin(y),_.subVectors(p,h).normalize(),u.push(_.x,_.y,_.z),f.push(d/s),f.push(S/i)}}for(let S=1;S<=i;S++)for(let m=1;m<=s;m++){const d=(s+1)*S+m-1,y=(s+1)*(S-1)+m-1,E=(s+1)*(S-1)+m,M=(s+1)*S+m;l.push(d,y,M),l.push(y,E,M)}this.setIndex(l),this.setAttribute("position",new ee(c,3)),this.setAttribute("normal",new ee(u,3)),this.setAttribute("uv",new ee(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gu(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class _u extends ae{constructor(t=1,n=.4,i=64,s=8,r=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:n,tubularSegments:i,radialSegments:s,p:r,q:a},i=Math.floor(i),s=Math.floor(s);const o=[],l=[],c=[],u=[],f=new P,h=new P,p=new P,_=new P,S=new P,m=new P,d=new P;for(let E=0;E<=i;++E){const M=E/i*r*Math.PI*2;y(M,r,a,t,p),y(M+.01,r,a,t,_),m.subVectors(_,p),d.addVectors(_,p),S.crossVectors(m,d),d.crossVectors(S,m),S.normalize(),d.normalize();for(let w=0;w<=s;++w){const b=w/s*Math.PI*2,C=-n*Math.cos(b),v=n*Math.sin(b);f.x=p.x+(C*d.x+v*S.x),f.y=p.y+(C*d.y+v*S.y),f.z=p.z+(C*d.z+v*S.z),l.push(f.x,f.y,f.z),h.subVectors(f,p).normalize(),c.push(h.x,h.y,h.z),u.push(E/i),u.push(w/s)}}for(let E=1;E<=i;E++)for(let M=1;M<=s;M++){const w=(s+1)*(E-1)+(M-1),b=(s+1)*E+(M-1),C=(s+1)*E+M,v=(s+1)*(E-1)+M;o.push(w,b,v),o.push(b,C,v)}this.setIndex(o),this.setAttribute("position",new ee(l,3)),this.setAttribute("normal",new ee(c,3)),this.setAttribute("uv",new ee(u,2));function y(E,M,w,b,C){const v=Math.cos(E),A=Math.sin(E),D=w/M*E,L=Math.cos(D);C.x=b*(2+L)*.5*v,C.y=b*(2+L)*A*.5,C.z=b*Math.sin(D)*.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _u(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}}function Br(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const s=e[n][i];if(id(s))s.isRenderTargetTexture?(Ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone();else if(Array.isArray(s))if(id(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[n][i]=r}else t[n][i]=s.slice();else t[n][i]=s}}return t}function En(e){const t={};for(let n=0;n<e.length;n++){const i=Br(e[n]);for(const s in i)t[s]=i[s]}return t}function id(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function _1(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Mm(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const ul={clone:Br,merge:En};var v1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,x1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mn extends Js{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=v1,this.fragmentShader=x1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Br(t.uniforms),this.uniformsGroups=_1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?n.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?n.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[s]={type:"m4",value:a.toArray()}:n.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(const i in t.uniforms){const s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=n[s.value]||null;break;case"c":this.uniforms[i].value=new Wt().setHex(s.value);break;case"v2":this.uniforms[i].value=new yt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new P().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Fe().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Bt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Le().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class M1 extends mn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class S1 extends Js{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=__,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class y1 extends Js{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Lo=new P,Do=new vs,xi=new P;class Sm extends vn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le,this.coordinateSystem=Ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Lo,Do,xi),xi.x===1&&xi.y===1&&xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lo,Do,xi.set(1,1,1)).invert()}updateWorldMatrix(t,n,i=!1){super.updateWorldMatrix(t,n,i),this.matrixWorld.decompose(Lo,Do,xi),xi.x===1&&xi.y===1&&xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lo,Do,xi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ls=new P,sd=new yt,rd=new yt;class ei extends Sm{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Oa*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Lr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Oa*2*Math.atan(Math.tan(Lr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){ls.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ls.x,ls.y).multiplyScalar(-t/ls.z),ls.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ls.x,ls.y).multiplyScalar(-t/ls.z)}getViewSize(t,n){return this.getViewBounds(t,sd,rd),n.subVectors(rd,sd)}setViewOffset(t,n,i,s,r,a){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(Lr*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,n-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class vu extends Sm{constructor(t=-1,n=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+n,l=s-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const xr=-90,Mr=1;class E1 extends vn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ei(xr,Mr,t,n);s.layers=this.layers,this.add(s);const r=new ei(xr,Mr,t,n);r.layers=this.layers,this.add(r);const a=new ei(xr,Mr,t,n);a.layers=this.layers,this.add(a);const o=new ei(xr,Mr,t,n);o.layers=this.layers,this.add(o);const l=new ei(xr,Mr,t,n);l.layers=this.layers,this.add(l);const c=new ei(xr,Mr,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,s,r,a,o,l]=n;for(const c of n)this.remove(c);if(t===Ai)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===sl)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,a),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),i.texture.generateMipmaps=S,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,u),t.setRenderTarget(f,h,p),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class b1 extends ei{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class T1{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=A1.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function A1(){this._document.hidden===!1&&this.reset()}class w1{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ut("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=performance.now();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}}class Ph{constructor(t=1,n=0,i=0){this.radius=t,this.phi=n,this.theta=i}set(t,n,i){return this.radius=t,this.phi=n,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Yt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,n,i){return this.radius=Math.sqrt(t*t+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Yt(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Sf=class Sf{constructor(t,n,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let i=0;i<4;i++)this.elements[i]=t[i+n];return this}set(t,n,i,s){const r=this.elements;return r[0]=t,r[2]=n,r[1]=i,r[3]=s,this}};Sf.prototype.isMatrix2=!0;let ad=Sf;class R1 extends Ss{constructor(t,n=null){super(),this.object=t,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Ut("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function od(e,t,n,i){const s=C1(i);switch(n){case rm:return e*t;case om:return e*t/s.components*s.byteLength;case su:return e*t/s.components*s.byteLength;case Ys:return e*t*2/s.components*s.byteLength;case ru:return e*t*2/s.components*s.byteLength;case am:return e*t*3/s.components*s.byteLength;case hi:return e*t*4/s.components*s.byteLength;case au:return e*t*4/s.components*s.byteLength;case Yo:case qo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ko:case Zo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case jc:case th:return Math.max(e,16)*Math.max(t,8)/4;case Jc:case Qc:return Math.max(e,8)*Math.max(t,8)/2;case eh:case nh:case sh:case rh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ih:case tl:case ah:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case oh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case lh:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ch:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case hh:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case uh:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case fh:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case dh:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ph:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case mh:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case gh:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case _h:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case vh:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case xh:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Mh:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Sh:case yh:case Eh:return Math.ceil(e/4)*Math.ceil(t/4)*16;case bh:case Th:return Math.ceil(e/4)*Math.ceil(t/4)*8;case el:case Ah:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function C1(e){switch(e){case ni:case em:return{byteLength:1,components:1};case Na:case nm:case zn:return{byteLength:2,components:1};case nu:case iu:return{byteLength:2,components:4};case Li:case eu:case Ti:return{byteLength:4,components:1};case im:case sm:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qh}}));typeof window<"u"&&(window.__THREE__?Ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ym(){let e=null,t=!1,n=null,i=null;function s(r,a){n(r,a),i=e.requestAnimationFrame(s)}return{start:function(){t!==!0&&n!==null&&e!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){n=r},setContext:function(r){e=r}}}function P1(e){const t=new WeakMap;function n(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=e.createBuffer();e.bindBuffer(l,h),e.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=e.SHORT;else if(c instanceof Uint32Array)p=e.UNSIGNED_INT;else if(c instanceof Int32Array)p=e.INT;else if(c instanceof Int8Array)p=e.BYTE;else if(c instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(e.bindBuffer(c,o),f.length===0)e.bufferSubData(c,0,u);else{f.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<f.length;p++){const _=f[h],S=f[p];S.start<=_.start+_.count+1?_.count=Math.max(_.count,S.start+S.count-_.start):(++h,f[h]=S)}f.length=h+1;for(let p=0,_=f.length;p<_;p++){const S=f[p];e.bufferSubData(c,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var L1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,D1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,I1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,U1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,N1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,F1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,O1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,B1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,k1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,z1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,G1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,V1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,H1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,W1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,X1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Y1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,q1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,K1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Z1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,J1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,j1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Q1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,tv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ev=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,nv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,iv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,av=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ov="gl_FragColor = linearToOutputTexel( gl_FragColor );",lv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,hv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,uv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,fv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,pv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_v=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,xv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Ev=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,bv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Tv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Av=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Cv=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Pv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Lv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Dv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Iv=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Uv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ov=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Gv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Wv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Kv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$v=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Jv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,t2=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,e2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,n2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,i2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,s2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,r2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,a2=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,o2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,l2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,c2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,h2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,u2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,f2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,d2=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,p2=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,m2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,g2=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,_2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,v2=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,x2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,M2=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,S2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,y2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,E2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,b2=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,T2=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,A2=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,w2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,R2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,C2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,P2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const L2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,D2=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,U2=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,B2=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,k2=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,z2=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,G2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,V2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,H2=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,W2=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,X2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Y2=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q2=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,K2=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z2=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$2=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J2=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,j2=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Q2=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ex=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,nx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ix=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ax=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ox=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,hx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Gt={alphahash_fragment:L1,alphahash_pars_fragment:D1,alphamap_fragment:I1,alphamap_pars_fragment:U1,alphatest_fragment:N1,alphatest_pars_fragment:F1,aomap_fragment:O1,aomap_pars_fragment:B1,batching_pars_vertex:k1,batching_vertex:z1,begin_vertex:G1,beginnormal_vertex:V1,bsdfs:H1,iridescence_fragment:W1,bumpmap_pars_fragment:X1,clipping_planes_fragment:Y1,clipping_planes_pars_fragment:q1,clipping_planes_pars_vertex:K1,clipping_planes_vertex:Z1,color_fragment:$1,color_pars_fragment:J1,color_pars_vertex:j1,color_vertex:Q1,common:tv,cube_uv_reflection_fragment:ev,defaultnormal_vertex:nv,displacementmap_pars_vertex:iv,displacementmap_vertex:sv,emissivemap_fragment:rv,emissivemap_pars_fragment:av,colorspace_fragment:ov,colorspace_pars_fragment:lv,envmap_fragment:cv,envmap_common_pars_fragment:hv,envmap_pars_fragment:uv,envmap_pars_vertex:fv,envmap_physical_pars_fragment:Ev,envmap_vertex:dv,fog_vertex:pv,fog_pars_vertex:mv,fog_fragment:gv,fog_pars_fragment:_v,gradientmap_pars_fragment:vv,lightmap_pars_fragment:xv,lights_lambert_fragment:Mv,lights_lambert_pars_fragment:Sv,lights_pars_begin:yv,lights_toon_fragment:bv,lights_toon_pars_fragment:Tv,lights_phong_fragment:Av,lights_phong_pars_fragment:wv,lights_physical_fragment:Rv,lights_physical_pars_fragment:Cv,lights_fragment_begin:Pv,lights_fragment_maps:Lv,lights_fragment_end:Dv,lightprobes_pars_fragment:Iv,logdepthbuf_fragment:Uv,logdepthbuf_pars_fragment:Nv,logdepthbuf_pars_vertex:Fv,logdepthbuf_vertex:Ov,map_fragment:Bv,map_pars_fragment:kv,map_particle_fragment:zv,map_particle_pars_fragment:Gv,metalnessmap_fragment:Vv,metalnessmap_pars_fragment:Hv,morphinstance_vertex:Wv,morphcolor_vertex:Xv,morphnormal_vertex:Yv,morphtarget_pars_vertex:qv,morphtarget_vertex:Kv,normal_fragment_begin:Zv,normal_fragment_maps:$v,normal_pars_fragment:Jv,normal_pars_vertex:jv,normal_vertex:Qv,normalmap_pars_fragment:t2,clearcoat_normal_fragment_begin:e2,clearcoat_normal_fragment_maps:n2,clearcoat_pars_fragment:i2,iridescence_pars_fragment:s2,opaque_fragment:r2,packing:a2,premultiplied_alpha_fragment:o2,project_vertex:l2,dithering_fragment:c2,dithering_pars_fragment:h2,roughnessmap_fragment:u2,roughnessmap_pars_fragment:f2,shadowmap_pars_fragment:d2,shadowmap_pars_vertex:p2,shadowmap_vertex:m2,shadowmask_pars_fragment:g2,skinbase_vertex:_2,skinning_pars_vertex:v2,skinning_vertex:x2,skinnormal_vertex:M2,specularmap_fragment:S2,specularmap_pars_fragment:y2,tonemapping_fragment:E2,tonemapping_pars_fragment:b2,transmission_fragment:T2,transmission_pars_fragment:A2,uv_pars_fragment:w2,uv_pars_vertex:R2,uv_vertex:C2,worldpos_vertex:P2,background_vert:L2,background_frag:D2,backgroundCube_vert:I2,backgroundCube_frag:U2,cube_vert:N2,cube_frag:F2,depth_vert:O2,depth_frag:B2,distance_vert:k2,distance_frag:z2,equirect_vert:G2,equirect_frag:V2,linedashed_vert:H2,linedashed_frag:W2,meshbasic_vert:X2,meshbasic_frag:Y2,meshlambert_vert:q2,meshlambert_frag:K2,meshmatcap_vert:Z2,meshmatcap_frag:$2,meshnormal_vert:J2,meshnormal_frag:j2,meshphong_vert:Q2,meshphong_frag:tx,meshphysical_vert:ex,meshphysical_frag:nx,meshtoon_vert:ix,meshtoon_frag:sx,points_vert:rx,points_frag:ax,shadow_vert:ox,shadow_frag:lx,sprite_vert:cx,sprite_frag:hx},mt={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},Ei={basic:{uniforms:En([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:En([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Wt(0)},envMapIntensity:{value:1}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:En([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:En([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:En([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:En([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:En([mt.points,mt.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:En([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:En([mt.common,mt.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:En([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:En([mt.sprite,mt.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distance:{uniforms:En([mt.common,mt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distance_vert,fragmentShader:Gt.distance_frag},shadow:{uniforms:En([mt.lights,mt.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};Ei.physical={uniforms:En([Ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const Io={r:0,b:0,g:0},ux=new Le,Em=new Bt;Em.set(-1,0,0,0,1,0,0,0,1);function fx(e,t,n,i,s,r){const a=new Wt(0);let o=s===!0?0:1,l,c,u=null,f=0,h=null;function p(y){let E=y.isScene===!0?y.background:null;if(E&&E.isTexture){const M=y.backgroundBlurriness>0;E=t.get(E,M)}return E}function _(y){let E=!1;const M=p(y);M===null?m(a,o):M&&M.isColor&&(m(M,1),E=!0);const w=e.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(e.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function S(y,E){const M=p(E);M&&(M.isCubeTexture||M.mapping===Ml)?(c===void 0&&(c=new pn(new Xa(1,1,1),new mn({name:"BackgroundCubeMaterial",uniforms:Br(Ei.backgroundCube.uniforms),vertexShader:Ei.backgroundCube.vertexShader,fragmentShader:Ei.backgroundCube.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,b,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(ux.makeRotationFromEuler(E.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Em),c.material.toneMapped=Kt.getTransfer(M.colorSpace)!==le,(u!==M||f!==M.version||h!==e.toneMapping)&&(c.material.needsUpdate=!0,u=M,f=M.version,h=e.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new pn(new El(2,2),new mn({name:"BackgroundMaterial",uniforms:Br(Ei.background.uniforms),vertexShader:Ei.background.vertexShader,fragmentShader:Ei.background.fragmentShader,side:_s,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Kt.getTransfer(M.colorSpace)!==le,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||f!==M.version||h!==e.toneMapping)&&(l.material.needsUpdate=!0,u=M,f=M.version,h=e.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,E){y.getRGB(Io,Mm(e)),n.buffers.color.setClear(Io.r,Io.g,Io.b,E,r)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,E=1){a.set(y),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:_,addToRenderList:S,dispose:d}}function dx(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function o(L,O,j,et,k){let Z=!1;const z=f(L,et,j,O);r!==z&&(r=z,c(r.object)),Z=p(L,et,j,k),Z&&_(L,et,j,k),k!==null&&t.update(k,e.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,M(L,O,j,et),k!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return e.createVertexArray()}function c(L){return e.bindVertexArray(L)}function u(L){return e.deleteVertexArray(L)}function f(L,O,j,et){const k=et.wireframe===!0;let Z=i[O.id];Z===void 0&&(Z={},i[O.id]=Z);const z=L.isInstancedMesh===!0?L.id:0;let nt=Z[z];nt===void 0&&(nt={},Z[z]=nt);let st=nt[j.id];st===void 0&&(st={},nt[j.id]=st);let pt=st[k];return pt===void 0&&(pt=h(l()),st[k]=pt),pt}function h(L){const O=[],j=[],et=[];for(let k=0;k<n;k++)O[k]=0,j[k]=0,et[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:j,attributeDivisors:et,object:L,attributes:{},index:null}}function p(L,O,j,et){const k=r.attributes,Z=O.attributes;let z=0;const nt=j.getAttributes();for(const st in nt)if(nt[st].location>=0){const gt=k[st];let xt=Z[st];if(xt===void 0&&(st==="instanceMatrix"&&L.instanceMatrix&&(xt=L.instanceMatrix),st==="instanceColor"&&L.instanceColor&&(xt=L.instanceColor)),gt===void 0||gt.attribute!==xt||xt&&gt.data!==xt.data)return!0;z++}return r.attributesNum!==z||r.index!==et}function _(L,O,j,et){const k={},Z=O.attributes;let z=0;const nt=j.getAttributes();for(const st in nt)if(nt[st].location>=0){let gt=Z[st];gt===void 0&&(st==="instanceMatrix"&&L.instanceMatrix&&(gt=L.instanceMatrix),st==="instanceColor"&&L.instanceColor&&(gt=L.instanceColor));const xt={};xt.attribute=gt,gt&&gt.data&&(xt.data=gt.data),k[st]=xt,z++}r.attributes=k,r.attributesNum=z,r.index=et}function S(){const L=r.newAttributes;for(let O=0,j=L.length;O<j;O++)L[O]=0}function m(L){d(L,0)}function d(L,O){const j=r.newAttributes,et=r.enabledAttributes,k=r.attributeDivisors;j[L]=1,et[L]===0&&(e.enableVertexAttribArray(L),et[L]=1),k[L]!==O&&(e.vertexAttribDivisor(L,O),k[L]=O)}function y(){const L=r.newAttributes,O=r.enabledAttributes;for(let j=0,et=O.length;j<et;j++)O[j]!==L[j]&&(e.disableVertexAttribArray(j),O[j]=0)}function E(L,O,j,et,k,Z,z){z===!0?e.vertexAttribIPointer(L,O,j,k,Z):e.vertexAttribPointer(L,O,j,et,k,Z)}function M(L,O,j,et){S();const k=et.attributes,Z=j.getAttributes(),z=O.defaultAttributeValues;for(const nt in Z){const st=Z[nt];if(st.location>=0){let pt=k[nt];if(pt===void 0&&(nt==="instanceMatrix"&&L.instanceMatrix&&(pt=L.instanceMatrix),nt==="instanceColor"&&L.instanceColor&&(pt=L.instanceColor)),pt!==void 0){const gt=pt.normalized,xt=pt.itemSize,Zt=t.get(pt);if(Zt===void 0)continue;const _e=Zt.buffer,$t=Zt.type,Q=Zt.bytesPerElement,ht=$t===e.INT||$t===e.UNSIGNED_INT||pt.gpuType===eu;if(pt.isInterleavedBufferAttribute){const rt=pt.data,Ft=rt.stride,Ot=pt.offset;if(rt.isInstancedInterleavedBuffer){for(let It=0;It<st.locationSize;It++)d(st.location+It,rt.meshPerAttribute);L.isInstancedMesh!==!0&&et._maxInstanceCount===void 0&&(et._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let It=0;It<st.locationSize;It++)m(st.location+It);e.bindBuffer(e.ARRAY_BUFFER,_e);for(let It=0;It<st.locationSize;It++)E(st.location+It,xt/st.locationSize,$t,gt,Ft*Q,(Ot+xt/st.locationSize*It)*Q,ht)}else{if(pt.isInstancedBufferAttribute){for(let rt=0;rt<st.locationSize;rt++)d(st.location+rt,pt.meshPerAttribute);L.isInstancedMesh!==!0&&et._maxInstanceCount===void 0&&(et._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let rt=0;rt<st.locationSize;rt++)m(st.location+rt);e.bindBuffer(e.ARRAY_BUFFER,_e);for(let rt=0;rt<st.locationSize;rt++)E(st.location+rt,xt/st.locationSize,$t,gt,xt*Q,xt/st.locationSize*rt*Q,ht)}}else if(z!==void 0){const gt=z[nt];if(gt!==void 0)switch(gt.length){case 2:e.vertexAttrib2fv(st.location,gt);break;case 3:e.vertexAttrib3fv(st.location,gt);break;case 4:e.vertexAttrib4fv(st.location,gt);break;default:e.vertexAttrib1fv(st.location,gt)}}}}y()}function w(){A();for(const L in i){const O=i[L];for(const j in O){const et=O[j];for(const k in et){const Z=et[k];for(const z in Z)u(Z[z].object),delete Z[z];delete et[k]}}delete i[L]}}function b(L){if(i[L.id]===void 0)return;const O=i[L.id];for(const j in O){const et=O[j];for(const k in et){const Z=et[k];for(const z in Z)u(Z[z].object),delete Z[z];delete et[k]}}delete i[L.id]}function C(L){for(const O in i){const j=i[O];for(const et in j){const k=j[et];if(k[L.id]===void 0)continue;const Z=k[L.id];for(const z in Z)u(Z[z].object),delete Z[z];delete k[L.id]}}}function v(L){for(const O in i){const j=i[O],et=L.isInstancedMesh===!0?L.id:0,k=j[et];if(k!==void 0){for(const Z in k){const z=k[Z];for(const nt in z)u(z[nt].object),delete z[nt];delete k[Z]}delete j[et],Object.keys(j).length===0&&delete i[O]}}}function A(){D(),a=!0,r!==s&&(r=s,c(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:D,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfObject:v,releaseStatesOfProgram:C,initAttributes:S,enableAttribute:m,disableUnusedAttributes:y}}function px(e,t,n){let i;function s(l){i=l}function r(l,c){e.drawArrays(i,l,c),n.update(c,i,1)}function a(l,c,u){u!==0&&(e.drawArraysInstanced(i,l,c,u),n.update(c,i,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let p=0;p<u;p++)h+=c[p];n.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function mx(e,t,n,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==hi&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const v=C===zn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==ni&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Ti&&!v)}function l(C){if(C==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const u=l(c);u!==c&&(Ut("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=n.logarithmicDepthBuffer===!0,h=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&h===!1&&Ut("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),_=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),d=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),E=e.getParameter(e.MAX_VARYING_VECTORS),M=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),w=e.getParameter(e.MAX_SAMPLES),b=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:y,maxVaryings:E,maxFragmentUniforms:M,maxSamples:w,samples:b}}function gx(e){const t=this;let n=null,i=0,s=!1,r=!1;const a=new us,o=new Bt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||s;return s=h,i=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){n=u(f,h,0)},this.setState=function(f,h,p){const _=f.clippingPlanes,S=f.clipIntersection,m=f.clipShadows,d=e.get(f);if(!s||_===null||_.length===0||r&&!m)r?u(null):c();else{const y=r?0:i,E=y*4;let M=d.clippingState||null;l.value=M,M=u(_,h,E,p);for(let w=0;w!==E;++w)M[w]=n[w];d.clippingState=M,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,p,_){const S=f!==null?f.length:0;let m=null;if(S!==0){if(m=l.value,_!==!0||m===null){const d=p+S*4,y=h.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<d)&&(m=new Float32Array(d));for(let E=0,M=p;E!==S;++E,M+=4)a.copy(f[E]).applyMatrix4(y,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,m}}const ms=4,ld=[.125,.215,.35,.446,.526,.582],Ns=20,_x=256,ba=new vu,cd=new Wt;let bc=null,Tc=0,Ac=0,wc=!1;const vx=new P;class hd{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,s=100,r={}){const{size:a=256,position:o=vx}=r;bc=this._renderer.getRenderTarget(),Tc=this._renderer.getActiveCubeFace(),Ac=this._renderer.getActiveMipmapLevel(),wc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(bc,Tc,Ac),this._renderer.xr.enabled=wc,t.scissorTest=!1,Sr(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Xs||t.mapping===Fr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),bc=this._renderer.getRenderTarget(),Tc=this._renderer.getActiveCubeFace(),Ac=this._renderer.getActiveMipmapLevel(),wc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:zn,format:hi,colorSpace:nl,depthBuffer:!1},s=ud(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ud(t,n,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=xx(r)),this._blurMaterial=Sx(r,t,n),this._ggxMaterial=Mx(r,t,n)}return s}_compileMaterial(t){const n=new pn(new ae,t);this._renderer.compile(n,ba)}_sceneToCubeUV(t,n,i,s,r){const l=new ei(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(cd),f.toneMapping=Ci,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pn(new Xa,new Yi({name:"PMREM.Background",side:Pn,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,m=S.material;let d=!1;const y=t.background;y?y.isColor&&(m.color.copy(y),t.background=null,d=!0):(m.color.copy(cd),d=!0);for(let E=0;E<6;E++){const M=E%3;M===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[E],r.y,r.z)):M===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[E]));const w=this._cubeSize;Sr(s,M*w,E>2?w:0,w,w),f.setRenderTarget(s),d&&f.render(S,l),f.render(t,l)}f.toneMapping=p,f.autoClear=h,t.background=y}_textureToCubeUV(t,n){const i=this._renderer,s=t.mapping===Xs||t.mapping===Fr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=dd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fd());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Sr(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,ba)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);n.autoClear=i}_applyGGXFilter(t,n,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=n/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=0+c*1.25,p=f*h,{_lodMax:_}=this,S=this._sizeLods[i],m=3*S*(i>_-ms?i-_+ms:0),d=4*(this._cubeSize-S);l.envMap.value=t.texture,l.roughness.value=p,l.mipInt.value=_-n,Sr(r,m,d,3*S,2*S),s.setRenderTarget(r),s.render(o,ba),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=_-i,Sr(t,m,d,3*S,2*S),s.setRenderTarget(t),s.render(o,ba)}_blur(t,n,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,n,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,n,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Qt("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=c;const h=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ns-1),S=r/_,m=isFinite(r)?1+Math.floor(u*S):Ns;m>Ns&&Ut(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ns}`);const d=[];let y=0;for(let C=0;C<Ns;++C){const v=C/S,A=Math.exp(-v*v/2);d.push(A),C===0?y+=A:C<m&&(y+=2*A)}for(let C=0;C<d.length;C++)d[C]=d[C]/y;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:E}=this;h.dTheta.value=_,h.mipInt.value=E-i;const M=this._sizeLods[s],w=3*M*(s>E-ms?s-E+ms:0),b=4*(this._cubeSize-M);Sr(n,w,b,3*M,2*M),l.setRenderTarget(n),l.render(f,ba)}}function xx(e){const t=[],n=[],i=[];let s=e;const r=e-ms+1+ld.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>e-ms?l=ld[a-e+ms-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,_=6,S=3,m=2,d=1,y=new Float32Array(S*_*p),E=new Float32Array(m*_*p),M=new Float32Array(d*_*p);for(let b=0;b<p;b++){const C=b%3*2/3-1,v=b>2?0:-1,A=[C,v,0,C+2/3,v,0,C+2/3,v+1,0,C,v,0,C+2/3,v+1,0,C,v+1,0];y.set(A,S*_*b),E.set(h,m*_*b);const D=[b,b,b,b,b,b];M.set(D,d*_*b)}const w=new ae;w.setAttribute("position",new ui(y,S)),w.setAttribute("uv",new ui(E,m)),w.setAttribute("faceIndex",new ui(M,d)),i.push(new pn(w,null)),s>ms&&s--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function ud(e,t,n){const i=new Ln(e,t,n);return i.texture.mapping=Ml,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Sr(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function Mx(e,t,n){return new mn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:_x,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:bl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Sx(e,t,n){const i=new Float32Array(Ns),s=new P(0,1,0);return new mn({name:"SphericalGaussianBlur",defines:{n:Ns,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:bl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function fd(){return new mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function dd(){return new mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function bl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class bm extends Ln{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new vm(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Xa(5,5,5),r=new mn({name:"CubemapFromEquirect",uniforms:Br(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Pn,blending:Ri});r.uniforms.tEquirect.value=n;const a=new pn(s,r),o=n.minFilter;return n.minFilter===Fs&&(n.minFilter=ln),new E1(1,10,this).update(t,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(n,i,s);t.setRenderTarget(r)}}function yx(e){let t=new WeakMap,n=new WeakMap,i=null;function s(h,p=!1){return h==null?null:p?a(h):r(h)}function r(h){if(h&&h.isTexture){const p=h.mapping;if(p===$l||p===Jl)if(t.has(h)){const _=t.get(h).texture;return o(_,h.mapping)}else{const _=h.image;if(_&&_.height>0){const S=new bm(_.height);return S.fromEquirectangularTexture(e,h),t.set(h,S),h.addEventListener("dispose",c),o(S.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const p=h.mapping,_=p===$l||p===Jl,S=p===Xs||p===Fr;if(_||S){let m=n.get(h);const d=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==d)return i===null&&(i=new hd(e)),m=_?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,n.set(h,m),m.texture;if(m!==void 0)return m.texture;{const y=h.image;return _&&y&&y.height>0||S&&y&&l(y)?(i===null&&(i=new hd(e)),m=_?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,n.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,p){return p===$l?h.mapping=Xs:p===Jl&&(h.mapping=Fr),h}function l(h){let p=0;const _=6;for(let S=0;S<_;S++)h[S]!==void 0&&p++;return p===_}function c(h){const p=h.target;p.removeEventListener("dispose",c);const _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function u(h){const p=h.target;p.removeEventListener("dispose",u);const _=n.get(p);_!==void 0&&(n.delete(p),_.dispose())}function f(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function Ex(e){const t={};function n(i){if(t[i]!==void 0)return t[i];const s=e.getExtension(i);return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const s=n(i);return s===null&&Pr("WebGLRenderer: "+i+" extension not supported."),s}}}function bx(e,t,n,i){const s={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const _ in h.attributes)t.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete s[h.id];const p=r.get(h);p&&(t.remove(p),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,n.memory.geometries++),h}function l(f){const h=f.attributes;for(const p in h)t.update(h[p],e.ARRAY_BUFFER)}function c(f){const h=[],p=f.index,_=f.attributes.position;let S=0;if(_===void 0)return;if(p!==null){const y=p.array;S=p.version;for(let E=0,M=y.length;E<M;E+=3){const w=y[E+0],b=y[E+1],C=y[E+2];h.push(w,b,b,C,C,w)}}else{const y=_.array;S=_.version;for(let E=0,M=y.length/3-1;E<M;E+=3){const w=E+0,b=E+1,C=E+2;h.push(w,b,b,C,C,w)}}const m=new(_.count>=65535?dm:fm)(h,1);m.version=S;const d=r.get(f);d&&t.remove(d),r.set(f,m)}function u(f){const h=r.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Tx(e,t,n){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,h){e.drawElements(i,h,r,f*a),n.update(h,i,1)}function c(f,h,p){p!==0&&(e.drawElementsInstanced(i,h,r,f*a,p),n.update(h,i,p))}function u(f,h,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,p);let S=0;for(let m=0;m<p;m++)S+=h[m];n.update(S,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Ax(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(n.calls++,a){case e.TRIANGLES:n.triangles+=o*(r/3);break;case e.LINES:n.lines+=o*(r/2);break;case e.LINE_STRIP:n.lines+=o*(r-1);break;case e.LINE_LOOP:n.lines+=o*r;break;case e.POINTS:n.points+=o*r;break;default:Qt("WebGLInfo: Unknown draw mode:",a);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function wx(e,t,n){const i=new WeakMap,s=new Fe;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let D=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",D)};var p=D;h!==void 0&&h.texture.dispose();const _=o.morphAttributes.position!==void 0,S=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let M=0;_===!0&&(M=1),S===!0&&(M=2),m===!0&&(M=3);let w=o.attributes.position.count*M,b=1;w>t.maxTextureSize&&(b=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const C=new Float32Array(w*b*4*f),v=new cm(C,w,b,f);v.type=Ti,v.needsUpdate=!0;const A=M*4;for(let L=0;L<f;L++){const O=d[L],j=y[L],et=E[L],k=w*b*4*L;for(let Z=0;Z<O.count;Z++){const z=Z*A;_===!0&&(s.fromBufferAttribute(O,Z),C[k+z+0]=s.x,C[k+z+1]=s.y,C[k+z+2]=s.z,C[k+z+3]=0),S===!0&&(s.fromBufferAttribute(j,Z),C[k+z+4]=s.x,C[k+z+5]=s.y,C[k+z+6]=s.z,C[k+z+7]=0),m===!0&&(s.fromBufferAttribute(et,Z),C[k+z+8]=s.x,C[k+z+9]=s.y,C[k+z+10]=s.z,C[k+z+11]=et.itemSize===4?s.w:1)}}h={count:f,texture:v,size:new yt(w,b)},i.set(o,h),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",a.morphTexture,n);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const S=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(e,"morphTargetBaseInfluence",S),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",h.size)}return{update:r}}function Rx(e,t,n,i,s){let r=new WeakMap;function a(c){const u=s.render.frame,f=c.geometry,h=t.get(c,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:a,dispose:o}}const Cx={[Kp]:"LINEAR_TONE_MAPPING",[Zp]:"REINHARD_TONE_MAPPING",[$p]:"CINEON_TONE_MAPPING",[tu]:"ACES_FILMIC_TONE_MAPPING",[jp]:"AGX_TONE_MAPPING",[Qp]:"NEUTRAL_TONE_MAPPING",[Jp]:"CUSTOM_TONE_MAPPING"};function Px(e,t,n,i,s,r){const a=new Ln(t,n,{type:e,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Or(t,n):void 0}),o=new Ln(t,n,{type:zn,depthBuffer:!1,stencilBuffer:!1}),l=new ae;l.setAttribute("position",new ee([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ee([0,2,0,0,2,0],2));const c=new M1({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new pn(l,c),f=new vu(-1,1,1,-1,0,1);let h=null,p=null,_=!1,S,m=null,d=[],y=!1;this.setSize=function(E,M){a.setSize(E,M),o.setSize(E,M);for(let w=0;w<d.length;w++){const b=d[w];b.setSize&&b.setSize(E,M)}},this.setEffects=function(E){d=E,y=d.length>0&&d[0].isRenderPass===!0;const M=a.width,w=a.height;for(let b=0;b<d.length;b++){const C=d[b];C.setSize&&C.setSize(M,w)}},this.begin=function(E,M){if(_||E.toneMapping===Ci&&d.length===0)return!1;if(m=M,M!==null){const w=M.width,b=M.height;(a.width!==w||a.height!==b)&&this.setSize(w,b)}return y===!1&&E.setRenderTarget(a),S=E.toneMapping,E.toneMapping=Ci,!0},this.hasRenderPass=function(){return y},this.end=function(E,M){E.toneMapping=S,_=!0;let w=a,b=o;for(let C=0;C<d.length;C++){const v=d[C];if(v.enabled!==!1&&(v.render(E,b,w,M),v.needsSwap!==!1)){const A=w;w=b,b=A}}if(h!==E.outputColorSpace||p!==E.toneMapping){h=E.outputColorSpace,p=E.toneMapping,c.defines={},Kt.getTransfer(h)===le&&(c.defines.SRGB_TRANSFER="");const C=Cx[p];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,E.setRenderTarget(m),E.render(u,f),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Tm=new _n,Lh=new Or(1,1),Am=new cm,wm=new $_,Rm=new vm,pd=[],md=[],gd=new Float32Array(16),_d=new Float32Array(9),vd=new Float32Array(4);function Qr(e,t,n){const i=e[0];if(i<=0||i>0)return e;const s=t*n;let r=pd[s];if(r===void 0&&(r=new Float32Array(s),pd[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=n,e[a].toArray(r,o)}return r}function Qe(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function tn(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Tl(e,t){let n=md[t];n===void 0&&(n=new Int32Array(t),md[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function Lx(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Dx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qe(n,t))return;e.uniform2fv(this.addr,t),tn(n,t)}}function Ix(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Qe(n,t))return;e.uniform3fv(this.addr,t),tn(n,t)}}function Ux(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qe(n,t))return;e.uniform4fv(this.addr,t),tn(n,t)}}function Nx(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Qe(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),tn(n,t)}else{if(Qe(n,i))return;vd.set(i),e.uniformMatrix2fv(this.addr,!1,vd),tn(n,i)}}function Fx(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Qe(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),tn(n,t)}else{if(Qe(n,i))return;_d.set(i),e.uniformMatrix3fv(this.addr,!1,_d),tn(n,i)}}function Ox(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Qe(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),tn(n,t)}else{if(Qe(n,i))return;gd.set(i),e.uniformMatrix4fv(this.addr,!1,gd),tn(n,i)}}function Bx(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function kx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qe(n,t))return;e.uniform2iv(this.addr,t),tn(n,t)}}function zx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Qe(n,t))return;e.uniform3iv(this.addr,t),tn(n,t)}}function Gx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qe(n,t))return;e.uniform4iv(this.addr,t),tn(n,t)}}function Vx(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Hx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qe(n,t))return;e.uniform2uiv(this.addr,t),tn(n,t)}}function Wx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Qe(n,t))return;e.uniform3uiv(this.addr,t),tn(n,t)}}function Xx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qe(n,t))return;e.uniform4uiv(this.addr,t),tn(n,t)}}function Yx(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let r;this.type===e.SAMPLER_2D_SHADOW?(Lh.compareFunction=n.isReversedDepthBuffer()?lu:ou,r=Lh):r=Tm,n.setTexture2D(t||r,s)}function qx(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||wm,s)}function Kx(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||Rm,s)}function Zx(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||Am,s)}function $x(e){switch(e){case 5126:return Lx;case 35664:return Dx;case 35665:return Ix;case 35666:return Ux;case 35674:return Nx;case 35675:return Fx;case 35676:return Ox;case 5124:case 35670:return Bx;case 35667:case 35671:return kx;case 35668:case 35672:return zx;case 35669:case 35673:return Gx;case 5125:return Vx;case 36294:return Hx;case 36295:return Wx;case 36296:return Xx;case 35678:case 36198:case 36298:case 36306:case 35682:return Yx;case 35679:case 36299:case 36307:return qx;case 35680:case 36300:case 36308:case 36293:return Kx;case 36289:case 36303:case 36311:case 36292:return Zx}}function Jx(e,t){e.uniform1fv(this.addr,t)}function jx(e,t){const n=Qr(t,this.size,2);e.uniform2fv(this.addr,n)}function Qx(e,t){const n=Qr(t,this.size,3);e.uniform3fv(this.addr,n)}function t3(e,t){const n=Qr(t,this.size,4);e.uniform4fv(this.addr,n)}function e3(e,t){const n=Qr(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function n3(e,t){const n=Qr(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function i3(e,t){const n=Qr(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function s3(e,t){e.uniform1iv(this.addr,t)}function r3(e,t){e.uniform2iv(this.addr,t)}function a3(e,t){e.uniform3iv(this.addr,t)}function o3(e,t){e.uniform4iv(this.addr,t)}function l3(e,t){e.uniform1uiv(this.addr,t)}function c3(e,t){e.uniform2uiv(this.addr,t)}function h3(e,t){e.uniform3uiv(this.addr,t)}function u3(e,t){e.uniform4uiv(this.addr,t)}function f3(e,t,n){const i=this.cache,s=t.length,r=Tl(n,s);Qe(i,r)||(e.uniform1iv(this.addr,r),tn(i,r));let a;this.type===e.SAMPLER_2D_SHADOW?a=Lh:a=Tm;for(let o=0;o!==s;++o)n.setTexture2D(t[o]||a,r[o])}function d3(e,t,n){const i=this.cache,s=t.length,r=Tl(n,s);Qe(i,r)||(e.uniform1iv(this.addr,r),tn(i,r));for(let a=0;a!==s;++a)n.setTexture3D(t[a]||wm,r[a])}function p3(e,t,n){const i=this.cache,s=t.length,r=Tl(n,s);Qe(i,r)||(e.uniform1iv(this.addr,r),tn(i,r));for(let a=0;a!==s;++a)n.setTextureCube(t[a]||Rm,r[a])}function m3(e,t,n){const i=this.cache,s=t.length,r=Tl(n,s);Qe(i,r)||(e.uniform1iv(this.addr,r),tn(i,r));for(let a=0;a!==s;++a)n.setTexture2DArray(t[a]||Am,r[a])}function g3(e){switch(e){case 5126:return Jx;case 35664:return jx;case 35665:return Qx;case 35666:return t3;case 35674:return e3;case 35675:return n3;case 35676:return i3;case 5124:case 35670:return s3;case 35667:case 35671:return r3;case 35668:case 35672:return a3;case 35669:case 35673:return o3;case 5125:return l3;case 36294:return c3;case 36295:return h3;case 36296:return u3;case 35678:case 36198:case 36298:case 36306:case 35682:return f3;case 35679:case 36299:case 36307:return d3;case 35680:case 36300:case 36308:case 36293:return p3;case 36289:case 36303:case 36311:case 36292:return m3}}class _3{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=$x(n.type)}}class v3{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=g3(n.type)}}class x3{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,n[o.id],i)}}}const Rc=/(\w+)(\])?(\[|\.)?/g;function xd(e,t){e.seq.push(t),e.map[t.id]=t}function M3(e,t,n){const i=e.name,s=i.length;for(Rc.lastIndex=0;;){const r=Rc.exec(i),a=Rc.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){xd(n,c===void 0?new _3(o,e,t):new v3(o,e,t));break}else{let f=n.map[o];f===void 0&&(f=new x3(o),xd(n,f)),n=f}}}class $o{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=t.getActiveUniform(n,a),l=t.getUniformLocation(n,o.name);M3(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,n,i,s){const r=this.map[n];r!==void 0&&r.setValue(t,i,s)}setOptional(t,n,i){const s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let r=0,a=n.length;r!==a;++r){const o=n[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,n){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in n&&i.push(a)}return i}}function Md(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const S3=37297;let y3=0;function E3(e,t){const n=e.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,n.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const Sd=new Bt;function b3(e){Kt._getMatrix(Sd,Kt.workingColorSpace,e);const t=`mat3( ${Sd.elements.map(n=>n.toFixed(4))} )`;switch(Kt.getTransfer(e)){case il:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return Ut("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function yd(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),r=(e.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+r+`

`+E3(e.getShaderSource(t),o)}else return r}function T3(e,t){const n=b3(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const A3={[Kp]:"Linear",[Zp]:"Reinhard",[$p]:"Cineon",[tu]:"ACESFilmic",[jp]:"AgX",[Qp]:"Neutral",[Jp]:"Custom"};function w3(e,t){const n=A3[t];return n===void 0?(Ut("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Uo=new P;function R3(){Kt.getLuminanceCoefficients(Uo);const e=Uo.x.toFixed(4),t=Uo.y.toFixed(4),n=Uo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function C3(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ra).join(`
`)}function P3(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function L3(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=e.getActiveAttrib(t,s),a=r.name;let o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Ra(e){return e!==""}function Ed(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bd(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const D3=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dh(e){return e.replace(D3,U3)}const I3=new Map;function U3(e,t){let n=Gt[t];if(n===void 0){const i=I3.get(t);if(i!==void 0)n=Gt[i],Ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Dh(n)}const N3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Td(e){return e.replace(N3,F3)}function F3(e,t,n,i){let s="";for(let r=parseInt(t);r<parseInt(n);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ad(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const O3={[Xo]:"SHADOWMAP_TYPE_PCF",[wa]:"SHADOWMAP_TYPE_VSM"};function B3(e){return O3[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const k3={[Xs]:"ENVMAP_TYPE_CUBE",[Fr]:"ENVMAP_TYPE_CUBE",[Ml]:"ENVMAP_TYPE_CUBE_UV"};function z3(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":k3[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const G3={[Fr]:"ENVMAP_MODE_REFRACTION"};function V3(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":G3[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const H3={[qp]:"ENVMAP_BLENDING_MULTIPLY",[p_]:"ENVMAP_BLENDING_MIX",[m_]:"ENVMAP_BLENDING_ADD"};function W3(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":H3[e.combine]||"ENVMAP_BLENDING_NONE"}function X3(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function Y3(e,t,n,i){const s=e.getContext(),r=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=B3(n),c=z3(n),u=V3(n),f=W3(n),h=X3(n),p=C3(n),_=P3(r),S=s.createProgram();let m,d,y=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Ra).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Ra).join(`
`),d.length>0&&(d+=`
`)):(m=[Ad(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ra).join(`
`),d=[Ad(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ci?"#define TONE_MAPPING":"",n.toneMapping!==Ci?Gt.tonemapping_pars_fragment:"",n.toneMapping!==Ci?w3("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,T3("linearToOutputTexel",n.outputColorSpace),R3(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ra).join(`
`)),a=Dh(a),a=Ed(a,n),a=bd(a,n),o=Dh(o),o=Ed(o,n),o=bd(o,n),a=Td(a),o=Td(o),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",n.glslVersion===Lf?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Lf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=y+m+a,M=y+d+o,w=Md(s,s.VERTEX_SHADER,E),b=Md(s,s.FRAGMENT_SHADER,M);s.attachShader(S,w),s.attachShader(S,b),n.index0AttributeName!==void 0?s.bindAttribLocation(S,0,n.index0AttributeName):n.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function C(L){if(e.debug.checkShaderErrors){const O=s.getProgramInfoLog(S)||"",j=s.getShaderInfoLog(w)||"",et=s.getShaderInfoLog(b)||"",k=O.trim(),Z=j.trim(),z=et.trim();let nt=!0,st=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(nt=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,S,w,b);else{const pt=yd(s,w,"vertex"),gt=yd(s,b,"fragment");Qt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+k+`
`+pt+`
`+gt)}else k!==""?Ut("WebGLProgram: Program Info Log:",k):(Z===""||z==="")&&(st=!1);st&&(L.diagnostics={runnable:nt,programLog:k,vertexShader:{log:Z,prefix:m},fragmentShader:{log:z,prefix:d}})}s.deleteShader(w),s.deleteShader(b),v=new $o(s,S),A=L3(s,S)}let v;this.getUniforms=function(){return v===void 0&&C(this),v};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(S,S3)),D},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=y3++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=w,this.fragmentShader=b,this}let q3=0;class K3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,i){const s=this._getShaderCacheForMaterial(t);return s.has(n)===!1&&(s.add(n),n.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new Z3(t),n.set(t,i)),i}}class Z3{constructor(t){this.id=q3++,this.code=t,this.usedTimes=0}}function $3(e){return e===Ys||e===tl||e===el}function J3(e,t,n,i,s,r){const a=new hm,o=new K3,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return l.add(v),v===0?"uv":`uv${v}`}function S(v,A,D,L,O,j){const et=L.fog,k=O.geometry,Z=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?L.environment:null,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,nt=t.get(v.envMap||Z,z),st=nt&&nt.mapping===Ml?nt.image.height:null,pt=p[v.type];v.precision!==null&&(h=i.getMaxPrecision(v.precision),h!==v.precision&&Ut("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const gt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,xt=gt!==void 0?gt.length:0;let Zt=0;k.morphAttributes.position!==void 0&&(Zt=1),k.morphAttributes.normal!==void 0&&(Zt=2),k.morphAttributes.color!==void 0&&(Zt=3);let _e,$t,Q,ht;if(pt){const ut=Ei[pt];_e=ut.vertexShader,$t=ut.fragmentShader}else{_e=v.vertexShader,$t=v.fragmentShader;const ut=o.getVertexShaderStage(v),qt=o.getFragmentShaderStage(v);o.update(v,ut,qt),Q=ut.id,ht=qt.id}const rt=e.getRenderTarget(),Ft=e.state.buffers.depth.getReversed(),Ot=O.isInstancedMesh===!0,It=O.isBatchedMesh===!0,ve=!!v.map,Vt=!!v.matcap,ne=!!nt,Jt=!!v.aoMap,Xt=!!v.lightMap,Te=!!v.bumpMap&&v.wireframe===!1,xe=!!v.normalMap,Ie=!!v.displacementMap,Ae=!!v.emissiveMap,Me=!!v.metalnessMap,Se=!!v.roughnessMap,I=v.anisotropy>0,qe=v.clearcoat>0,jt=v.dispersion>0,T=v.iridescence>0,g=v.sheen>0,F=v.transmission>0,V=I&&!!v.anisotropyMap,q=qe&&!!v.clearcoatMap,ot=qe&&!!v.clearcoatNormalMap,ct=qe&&!!v.clearcoatRoughnessMap,K=T&&!!v.iridescenceMap,J=T&&!!v.iridescenceThicknessMap,ft=g&&!!v.sheenColorMap,bt=g&&!!v.sheenRoughnessMap,at=!!v.specularMap,dt=!!v.specularColorMap,Pt=!!v.specularIntensityMap,B=F&&!!v.transmissionMap,tt=F&&!!v.thicknessMap,R=!!v.gradientMap,X=!!v.alphaMap,N=v.alphaTest>0,$=!!v.alphaHash,it=!!v.extensions;let Y=Ci;v.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(Y=e.toneMapping);const lt={shaderID:pt,shaderType:v.type,shaderName:v.name,vertexShader:_e,fragmentShader:$t,defines:v.defines,customVertexShaderID:Q,customFragmentShaderID:ht,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:It,batchingColor:It&&O._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&O.instanceColor!==null,instancingMorph:Ot&&O.morphTexture!==null,outputColorSpace:rt===null?e.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Kt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:ve,matcap:Vt,envMap:ne,envMapMode:ne&&nt.mapping,envMapCubeUVHeight:st,aoMap:Jt,lightMap:Xt,bumpMap:Te,normalMap:xe,displacementMap:Ie,emissiveMap:Ae,normalMapObjectSpace:xe&&v.normalMapType===v_,normalMapTangentSpace:xe&&v.normalMapType===Cf,packedNormalMap:xe&&v.normalMapType===Cf&&$3(v.normalMap.format),metalnessMap:Me,roughnessMap:Se,anisotropy:I,anisotropyMap:V,clearcoat:qe,clearcoatMap:q,clearcoatNormalMap:ot,clearcoatRoughnessMap:ct,dispersion:jt,iridescence:T,iridescenceMap:K,iridescenceThicknessMap:J,sheen:g,sheenColorMap:ft,sheenRoughnessMap:bt,specularMap:at,specularColorMap:dt,specularIntensityMap:Pt,transmission:F,transmissionMap:B,thicknessMap:tt,gradientMap:R,opaque:v.transparent===!1&&v.blending===Cr&&v.alphaToCoverage===!1,alphaMap:X,alphaTest:N,alphaHash:$,combine:v.combine,mapUv:ve&&_(v.map.channel),aoMapUv:Jt&&_(v.aoMap.channel),lightMapUv:Xt&&_(v.lightMap.channel),bumpMapUv:Te&&_(v.bumpMap.channel),normalMapUv:xe&&_(v.normalMap.channel),displacementMapUv:Ie&&_(v.displacementMap.channel),emissiveMapUv:Ae&&_(v.emissiveMap.channel),metalnessMapUv:Me&&_(v.metalnessMap.channel),roughnessMapUv:Se&&_(v.roughnessMap.channel),anisotropyMapUv:V&&_(v.anisotropyMap.channel),clearcoatMapUv:q&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:ot&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:J&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:ft&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:bt&&_(v.sheenRoughnessMap.channel),specularMapUv:at&&_(v.specularMap.channel),specularColorMapUv:dt&&_(v.specularColorMap.channel),specularIntensityMapUv:Pt&&_(v.specularIntensityMap.channel),transmissionMapUv:B&&_(v.transmissionMap.channel),thicknessMapUv:tt&&_(v.thicknessMap.channel),alphaMapUv:X&&_(v.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(xe||I),vertexNormals:!!k.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!k.attributes.uv&&(ve||X),fog:!!et,useFog:v.fog===!0,fogExp2:!!et&&et.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||k.attributes.normal===void 0&&xe===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Ft,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:xt,morphTextureStride:Zt,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:j.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:e.shadowMap.enabled&&D.length>0,shadowMapType:e.shadowMap.type,toneMapping:Y,decodeVideoTexture:ve&&v.map.isVideoTexture===!0&&Kt.getTransfer(v.map.colorSpace)===le,decodeVideoTextureEmissive:Ae&&v.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(v.emissiveMap.colorSpace)===le,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===bi,flipSided:v.side===Pn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:it&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&v.extensions.multiDraw===!0||It)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return lt.vertexUv1s=l.has(1),lt.vertexUv2s=l.has(2),lt.vertexUv3s=l.has(3),l.clear(),lt}function m(v){const A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(const D in v.defines)A.push(D),A.push(v.defines[D]);return v.isRawShaderMaterial===!1&&(d(A,v),y(A,v),A.push(e.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function d(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function y(v,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function E(v){const A=p[v.type];let D;if(A){const L=Ei[A];D=ul.clone(L.uniforms)}else D=v.uniforms;return D}function M(v,A){let D=u.get(A);return D!==void 0?++D.usedTimes:(D=new Y3(e,A,v,s),c.push(D),u.set(A,D)),D}function w(v){if(--v.usedTimes===0){const A=c.indexOf(v);c[A]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function b(v){o.remove(v)}function C(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:E,acquireProgram:M,releaseProgram:w,releaseShaderCache:b,programs:c,dispose:C}}function j3(){let e=new WeakMap;function t(a){return e.has(a)}function n(a){let o=e.get(a);return o===void 0&&(o={},e.set(a,o)),o}function i(a){e.delete(a)}function s(a,o,l){e.get(a)[o]=l}function r(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:r}}function Q3(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function wd(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Rd(){const e=[];let t=0;const n=[],i=[],s=[];function r(){t=0,n.length=0,i.length=0,s.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,_,S,m,d){let y=e[t];return y===void 0?(y={id:h.id,object:h,geometry:p,material:_,materialVariant:a(h),groupOrder:S,renderOrder:h.renderOrder,z:m,group:d},e[t]=y):(y.id=h.id,y.object=h,y.geometry=p,y.material=_,y.materialVariant=a(h),y.groupOrder=S,y.renderOrder=h.renderOrder,y.z=m,y.group=d),t++,y}function l(h,p,_,S,m,d){const y=o(h,p,_,S,m,d);_.transmission>0?i.push(y):_.transparent===!0?s.push(y):n.push(y)}function c(h,p,_,S,m,d){const y=o(h,p,_,S,m,d);_.transmission>0?i.unshift(y):_.transparent===!0?s.unshift(y):n.unshift(y)}function u(h,p,_){n.length>1&&n.sort(h||Q3),i.length>1&&i.sort(p||wd),s.length>1&&s.sort(p||wd),_&&(n.reverse(),i.reverse(),s.reverse())}function f(){for(let h=t,p=e.length;h<p;h++){const _=e[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:f,sort:u}}function tM(){let e=new WeakMap;function t(i,s){const r=e.get(i);let a;return r===void 0?(a=new Rd,e.set(i,[a])):s>=r.length?(a=new Rd,r.push(a)):a=r[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}function eM(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new P,color:new Wt};break;case"SpotLight":n={position:new P,direction:new P,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new P,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new P,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":n={color:new Wt,position:new P,halfWidth:new P,halfHeight:new P};break}return e[t.id]=n,n}}}function nM(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let iM=0;function sM(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function rM(e){const t=new eM,n=nM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);const s=new P,r=new Le,a=new Le;function o(c){let u=0,f=0,h=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let p=0,_=0,S=0,m=0,d=0,y=0,E=0,M=0,w=0,b=0,C=0;c.sort(sM);for(let A=0,D=c.length;A<D;A++){const L=c[A],O=L.color,j=L.intensity,et=L.distance;let k=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Ys?k=L.shadow.map.texture:k=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)u+=O.r*j,f+=O.g*j,h+=O.b*j;else if(L.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(L.sh.coefficients[Z],j);C++}else if(L.isDirectionalLight){const Z=t.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const z=L.shadow,nt=n.get(L);nt.shadowIntensity=z.intensity,nt.shadowBias=z.bias,nt.shadowNormalBias=z.normalBias,nt.shadowRadius=z.radius,nt.shadowMapSize=z.mapSize,i.directionalShadow[p]=nt,i.directionalShadowMap[p]=k,i.directionalShadowMatrix[p]=L.shadow.matrix,y++}i.directional[p]=Z,p++}else if(L.isSpotLight){const Z=t.get(L);Z.position.setFromMatrixPosition(L.matrixWorld),Z.color.copy(O).multiplyScalar(j),Z.distance=et,Z.coneCos=Math.cos(L.angle),Z.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Z.decay=L.decay,i.spot[S]=Z;const z=L.shadow;if(L.map&&(i.spotLightMap[w]=L.map,w++,z.updateMatrices(L),L.castShadow&&b++),i.spotLightMatrix[S]=z.matrix,L.castShadow){const nt=n.get(L);nt.shadowIntensity=z.intensity,nt.shadowBias=z.bias,nt.shadowNormalBias=z.normalBias,nt.shadowRadius=z.radius,nt.shadowMapSize=z.mapSize,i.spotShadow[S]=nt,i.spotShadowMap[S]=k,M++}S++}else if(L.isRectAreaLight){const Z=t.get(L);Z.color.copy(O).multiplyScalar(j),Z.halfWidth.set(L.width*.5,0,0),Z.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=Z,m++}else if(L.isPointLight){const Z=t.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity),Z.distance=L.distance,Z.decay=L.decay,L.castShadow){const z=L.shadow,nt=n.get(L);nt.shadowIntensity=z.intensity,nt.shadowBias=z.bias,nt.shadowNormalBias=z.normalBias,nt.shadowRadius=z.radius,nt.shadowMapSize=z.mapSize,nt.shadowCameraNear=z.camera.near,nt.shadowCameraFar=z.camera.far,i.pointShadow[_]=nt,i.pointShadowMap[_]=k,i.pointShadowMatrix[_]=L.shadow.matrix,E++}i.point[_]=Z,_++}else if(L.isHemisphereLight){const Z=t.get(L);Z.skyColor.copy(L.color).multiplyScalar(j),Z.groundColor.copy(L.groundColor).multiplyScalar(j),i.hemi[d]=Z,d++}}m>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=mt.LTC_FLOAT_1,i.rectAreaLTC2=mt.LTC_FLOAT_2):(i.rectAreaLTC1=mt.LTC_HALF_1,i.rectAreaLTC2=mt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const v=i.hash;(v.directionalLength!==p||v.pointLength!==_||v.spotLength!==S||v.rectAreaLength!==m||v.hemiLength!==d||v.numDirectionalShadows!==y||v.numPointShadows!==E||v.numSpotShadows!==M||v.numSpotMaps!==w||v.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=S,i.rectArea.length=m,i.point.length=_,i.hemi.length=d,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=M+w-b,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=C,v.directionalLength=p,v.pointLength=_,v.spotLength=S,v.rectAreaLength=m,v.hemiLength=d,v.numDirectionalShadows=y,v.numPointShadows=E,v.numSpotShadows=M,v.numSpotMaps=w,v.numLightProbes=C,i.version=iM++)}function l(c,u){let f=0,h=0,p=0,_=0,S=0;const m=u.matrixWorldInverse;for(let d=0,y=c.length;d<y;d++){const E=c[d];if(E.isDirectionalLight){const M=i.directional[f];M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(E.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const M=i.rectArea[_];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),_++}else if(E.isPointLight){const M=i.point[h];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),h++}else if(E.isHemisphereLight){const M=i.hemi[S];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(m),S++}}}return{setup:o,setupView:l,state:i}}function Cd(e){const t=new rM(e),n=[],i=[],s=[];function r(h){f.camera=h,n.length=0,i.length=0,s.length=0}function a(h){n.push(h)}function o(h){i.push(h)}function l(h){s.push(h)}function c(){t.setup(n)}function u(h){t.setupView(n,h)}const f={lightsArray:n,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function aM(e){let t=new WeakMap;function n(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Cd(e),t.set(s,[o])):r>=a.length?(o=new Cd(e),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:n,dispose:i}}const oM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,cM=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],hM=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Pd=new Le,Ta=new P,Cc=new P;function uM(e,t,n){let i=new gm;const s=new yt,r=new yt,a=new Fe,o=new S1,l=new y1,c={},u=n.maxTextureSize,f={[_s]:Pn,[Pn]:_s,[bi]:bi},h=new mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:oM,fragmentShader:lM}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const _=new ae;_.setAttribute("position",new ui(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new pn(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xo;let d=this.type;this.render=function(b,C,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===Zg&&(Ut("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Xo);const A=e.getRenderTarget(),D=e.getActiveCubeFace(),L=e.getActiveMipmapLevel(),O=e.state;O.setBlending(Ri),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const j=d!==this.type;j&&C.traverse(function(et){et.material&&(Array.isArray(et.material)?et.material.forEach(k=>k.needsUpdate=!0):et.material.needsUpdate=!0)});for(let et=0,k=b.length;et<k;et++){const Z=b[et],z=Z.shadow;if(z===void 0){Ut("WebGLShadowMap:",Z,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const nt=z.getFrameExtents();s.multiply(nt),r.copy(z.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/nt.x),s.x=r.x*nt.x,z.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/nt.y),s.y=r.y*nt.y,z.mapSize.y=r.y));const st=e.state.buffers.depth.getReversed();if(z.camera._reversedDepth=st,z.map===null||j===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===wa){if(Z.isPointLight){Ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new Ln(s.x,s.y,{format:Ys,type:zn,minFilter:ln,magFilter:ln,generateMipmaps:!1}),z.map.texture.name=Z.name+".shadowMap",z.map.depthTexture=new Or(s.x,s.y,Ti),z.map.depthTexture.name=Z.name+".shadowMapDepth",z.map.depthTexture.format=Zi,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=on,z.map.depthTexture.magFilter=on}else Z.isPointLight?(z.map=new bm(s.x),z.map.depthTexture=new g1(s.x,Li)):(z.map=new Ln(s.x,s.y),z.map.depthTexture=new Or(s.x,s.y,Li)),z.map.depthTexture.name=Z.name+".shadowMap",z.map.depthTexture.format=Zi,this.type===Xo?(z.map.depthTexture.compareFunction=st?lu:ou,z.map.depthTexture.minFilter=ln,z.map.depthTexture.magFilter=ln):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=on,z.map.depthTexture.magFilter=on);z.camera.updateProjectionMatrix()}const pt=z.map.isWebGLCubeRenderTarget?6:1;for(let gt=0;gt<pt;gt++){if(z.map.isWebGLCubeRenderTarget)e.setRenderTarget(z.map,gt),e.clear();else{gt===0&&(e.setRenderTarget(z.map),e.clear());const xt=z.getViewport(gt);a.set(r.x*xt.x,r.y*xt.y,r.x*xt.z,r.y*xt.w),O.viewport(a)}if(Z.isPointLight){const xt=z.camera,Zt=z.matrix,_e=Z.distance||xt.far;_e!==xt.far&&(xt.far=_e,xt.updateProjectionMatrix()),Ta.setFromMatrixPosition(Z.matrixWorld),xt.position.copy(Ta),Cc.copy(xt.position),Cc.add(cM[gt]),xt.up.copy(hM[gt]),xt.lookAt(Cc),xt.updateMatrixWorld(),Zt.makeTranslation(-Ta.x,-Ta.y,-Ta.z),Pd.multiplyMatrices(xt.projectionMatrix,xt.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Pd,xt.coordinateSystem,xt.reversedDepth)}else z.updateMatrices(Z);i=z.getFrustum(),M(C,v,z.camera,Z,this.type)}z.isPointLightShadow!==!0&&this.type===wa&&y(z,v),z.needsUpdate=!1}d=this.type,m.needsUpdate=!1,e.setRenderTarget(A,D,L)};function y(b,C){const v=t.update(S);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Ln(s.x,s.y,{format:Ys,type:zn})),h.uniforms.shadow_pass.value=b.map.depthTexture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,e.setRenderTarget(b.mapPass),e.clear(),e.renderBufferDirect(C,null,v,h,S,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,e.setRenderTarget(b.map),e.clear(),e.renderBufferDirect(C,null,v,p,S,null)}function E(b,C,v,A){let D=null;const L=v.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(L!==void 0)D=L;else if(D=v.isPointLight===!0?l:o,e.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const O=D.uuid,j=C.uuid;let et=c[O];et===void 0&&(et={},c[O]=et);let k=et[j];k===void 0&&(k=D.clone(),et[j]=k,C.addEventListener("dispose",w)),D=k}if(D.visible=C.visible,D.wireframe=C.wireframe,A===wa?D.side=C.shadowSide!==null?C.shadowSide:C.side:D.side=C.shadowSide!==null?C.shadowSide:f[C.side],D.alphaMap=C.alphaMap,D.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,D.map=C.map,D.clipShadows=C.clipShadows,D.clippingPlanes=C.clippingPlanes,D.clipIntersection=C.clipIntersection,D.displacementMap=C.displacementMap,D.displacementScale=C.displacementScale,D.displacementBias=C.displacementBias,D.wireframeLinewidth=C.wireframeLinewidth,D.linewidth=C.linewidth,v.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const O=e.properties.get(D);O.light=v}return D}function M(b,C,v,A,D){if(b.visible===!1)return;if(b.layers.test(C.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&D===wa)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,b.matrixWorld);const j=t.update(b),et=b.material;if(Array.isArray(et)){const k=j.groups;for(let Z=0,z=k.length;Z<z;Z++){const nt=k[Z],st=et[nt.materialIndex];if(st&&st.visible){const pt=E(b,st,A,D);b.onBeforeShadow(e,b,C,v,j,pt,nt),e.renderBufferDirect(v,null,j,pt,b,nt),b.onAfterShadow(e,b,C,v,j,pt,nt)}}}else if(et.visible){const k=E(b,et,A,D);b.onBeforeShadow(e,b,C,v,j,k,null),e.renderBufferDirect(v,null,j,k,b,null),b.onAfterShadow(e,b,C,v,j,k,null)}}const O=b.children;for(let j=0,et=O.length;j<et;j++)M(O[j],C,v,A,D)}function w(b){b.target.removeEventListener("dispose",w);for(const v in c){const A=c[v],D=b.target.uuid;D in A&&(A[D].dispose(),delete A[D])}}}function fM(e,t){function n(){let R=!1;const X=new Fe;let N=null;const $=new Fe(0,0,0,0);return{setMask:function(it){N!==it&&!R&&(e.colorMask(it,it,it,it),N=it)},setLocked:function(it){R=it},setClear:function(it,Y,lt,ut,qt){qt===!0&&(it*=ut,Y*=ut,lt*=ut),X.set(it,Y,lt,ut),$.equals(X)===!1&&(e.clearColor(it,Y,lt,ut),$.copy(X))},reset:function(){R=!1,N=null,$.set(-1,0,0,0)}}}function i(){let R=!1,X=!1,N=null,$=null,it=null;return{setReversed:function(Y){if(X!==Y){const lt=t.get("EXT_clip_control");Y?lt.clipControlEXT(lt.LOWER_LEFT_EXT,lt.ZERO_TO_ONE_EXT):lt.clipControlEXT(lt.LOWER_LEFT_EXT,lt.NEGATIVE_ONE_TO_ONE_EXT),X=Y;const ut=it;it=null,this.setClear(ut)}},getReversed:function(){return X},setTest:function(Y){Y?rt(e.DEPTH_TEST):Ft(e.DEPTH_TEST)},setMask:function(Y){N!==Y&&!R&&(e.depthMask(Y),N=Y)},setFunc:function(Y){if(X&&(Y=R_[Y]),$!==Y){switch(Y){case Vc:e.depthFunc(e.NEVER);break;case Hc:e.depthFunc(e.ALWAYS);break;case Wc:e.depthFunc(e.LESS);break;case Nr:e.depthFunc(e.LEQUAL);break;case Xc:e.depthFunc(e.EQUAL);break;case Yc:e.depthFunc(e.GEQUAL);break;case qc:e.depthFunc(e.GREATER);break;case Kc:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}$=Y}},setLocked:function(Y){R=Y},setClear:function(Y){it!==Y&&(it=Y,X&&(Y=1-Y),e.clearDepth(Y))},reset:function(){R=!1,N=null,$=null,it=null,X=!1}}}function s(){let R=!1,X=null,N=null,$=null,it=null,Y=null,lt=null,ut=null,qt=null;return{setTest:function(zt){R||(zt?rt(e.STENCIL_TEST):Ft(e.STENCIL_TEST))},setMask:function(zt){X!==zt&&!R&&(e.stencilMask(zt),X=zt)},setFunc:function(zt,we,Kn){(N!==zt||$!==we||it!==Kn)&&(e.stencilFunc(zt,we,Kn),N=zt,$=we,it=Kn)},setOp:function(zt,we,Kn){(Y!==zt||lt!==we||ut!==Kn)&&(e.stencilOp(zt,we,Kn),Y=zt,lt=we,ut=Kn)},setLocked:function(zt){R=zt},setClear:function(zt){qt!==zt&&(e.clearStencil(zt),qt=zt)},reset:function(){R=!1,X=null,N=null,$=null,it=null,Y=null,lt=null,ut=null,qt=null}}}const r=new n,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let u={},f={},h={},p=new WeakMap,_=[],S=null,m=!1,d=null,y=null,E=null,M=null,w=null,b=null,C=null,v=new Wt(0,0,0),A=0,D=!1,L=null,O=null,j=null,et=null,k=null;const Z=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,nt=0;const st=e.getParameter(e.VERSION);st.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(st)[1]),z=nt>=1):st.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(st)[1]),z=nt>=2);let pt=null,gt={};const xt=e.getParameter(e.SCISSOR_BOX),Zt=e.getParameter(e.VIEWPORT),_e=new Fe().fromArray(xt),$t=new Fe().fromArray(Zt);function Q(R,X,N,$){const it=new Uint8Array(4),Y=e.createTexture();e.bindTexture(R,Y),e.texParameteri(R,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(R,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let lt=0;lt<N;lt++)R===e.TEXTURE_3D||R===e.TEXTURE_2D_ARRAY?e.texImage3D(X,0,e.RGBA,1,1,$,0,e.RGBA,e.UNSIGNED_BYTE,it):e.texImage2D(X+lt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,it);return Y}const ht={};ht[e.TEXTURE_2D]=Q(e.TEXTURE_2D,e.TEXTURE_2D,1),ht[e.TEXTURE_CUBE_MAP]=Q(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ht[e.TEXTURE_2D_ARRAY]=Q(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ht[e.TEXTURE_3D]=Q(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),rt(e.DEPTH_TEST),a.setFunc(Nr),Te(!1),xe(Af),rt(e.CULL_FACE),Jt(Ri);function rt(R){u[R]!==!0&&(e.enable(R),u[R]=!0)}function Ft(R){u[R]!==!1&&(e.disable(R),u[R]=!1)}function Ot(R,X){return h[R]!==X?(e.bindFramebuffer(R,X),h[R]=X,R===e.DRAW_FRAMEBUFFER&&(h[e.FRAMEBUFFER]=X),R===e.FRAMEBUFFER&&(h[e.DRAW_FRAMEBUFFER]=X),!0):!1}function It(R,X){let N=_,$=!1;if(R){N=p.get(X),N===void 0&&(N=[],p.set(X,N));const it=R.textures;if(N.length!==it.length||N[0]!==e.COLOR_ATTACHMENT0){for(let Y=0,lt=it.length;Y<lt;Y++)N[Y]=e.COLOR_ATTACHMENT0+Y;N.length=it.length,$=!0}}else N[0]!==e.BACK&&(N[0]=e.BACK,$=!0);$&&e.drawBuffers(N)}function ve(R){return S!==R?(e.useProgram(R),S=R,!0):!1}const Vt={[Ds]:e.FUNC_ADD,[Jg]:e.FUNC_SUBTRACT,[jg]:e.FUNC_REVERSE_SUBTRACT};Vt[Qg]=e.MIN,Vt[t_]=e.MAX;const ne={[e_]:e.ZERO,[n_]:e.ONE,[i_]:e.SRC_COLOR,[zc]:e.SRC_ALPHA,[c_]:e.SRC_ALPHA_SATURATE,[o_]:e.DST_COLOR,[r_]:e.DST_ALPHA,[s_]:e.ONE_MINUS_SRC_COLOR,[Gc]:e.ONE_MINUS_SRC_ALPHA,[l_]:e.ONE_MINUS_DST_COLOR,[a_]:e.ONE_MINUS_DST_ALPHA,[h_]:e.CONSTANT_COLOR,[u_]:e.ONE_MINUS_CONSTANT_COLOR,[f_]:e.CONSTANT_ALPHA,[d_]:e.ONE_MINUS_CONSTANT_ALPHA};function Jt(R,X,N,$,it,Y,lt,ut,qt,zt){if(R===Ri){m===!0&&(Ft(e.BLEND),m=!1);return}if(m===!1&&(rt(e.BLEND),m=!0),R!==$g){if(R!==d||zt!==D){if((y!==Ds||w!==Ds)&&(e.blendEquation(e.FUNC_ADD),y=Ds,w=Ds),zt)switch(R){case Cr:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Rn:e.blendFunc(e.ONE,e.ONE);break;case wf:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Rf:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Qt("WebGLState: Invalid blending: ",R);break}else switch(R){case Cr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Rn:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case wf:Qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Rf:Qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qt("WebGLState: Invalid blending: ",R);break}E=null,M=null,b=null,C=null,v.set(0,0,0),A=0,d=R,D=zt}return}it=it||X,Y=Y||N,lt=lt||$,(X!==y||it!==w)&&(e.blendEquationSeparate(Vt[X],Vt[it]),y=X,w=it),(N!==E||$!==M||Y!==b||lt!==C)&&(e.blendFuncSeparate(ne[N],ne[$],ne[Y],ne[lt]),E=N,M=$,b=Y,C=lt),(ut.equals(v)===!1||qt!==A)&&(e.blendColor(ut.r,ut.g,ut.b,qt),v.copy(ut),A=qt),d=R,D=!1}function Xt(R,X){R.side===bi?Ft(e.CULL_FACE):rt(e.CULL_FACE);let N=R.side===Pn;X&&(N=!N),Te(N),R.blending===Cr&&R.transparent===!1?Jt(Ri):Jt(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),a.setFunc(R.depthFunc),a.setTest(R.depthTest),a.setMask(R.depthWrite),r.setMask(R.colorWrite);const $=R.stencilWrite;o.setTest($),$&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),Ae(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?rt(e.SAMPLE_ALPHA_TO_COVERAGE):Ft(e.SAMPLE_ALPHA_TO_COVERAGE)}function Te(R){L!==R&&(R?e.frontFace(e.CW):e.frontFace(e.CCW),L=R)}function xe(R){R!==qg?(rt(e.CULL_FACE),R!==O&&(R===Af?e.cullFace(e.BACK):R===Kg?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Ft(e.CULL_FACE),O=R}function Ie(R){R!==j&&(z&&e.lineWidth(R),j=R)}function Ae(R,X,N){R?(rt(e.POLYGON_OFFSET_FILL),(et!==X||k!==N)&&(et=X,k=N,a.getReversed()&&(X=-X),e.polygonOffset(X,N))):Ft(e.POLYGON_OFFSET_FILL)}function Me(R){R?rt(e.SCISSOR_TEST):Ft(e.SCISSOR_TEST)}function Se(R){R===void 0&&(R=e.TEXTURE0+Z-1),pt!==R&&(e.activeTexture(R),pt=R)}function I(R,X,N){N===void 0&&(pt===null?N=e.TEXTURE0+Z-1:N=pt);let $=gt[N];$===void 0&&($={type:void 0,texture:void 0},gt[N]=$),($.type!==R||$.texture!==X)&&(pt!==N&&(e.activeTexture(N),pt=N),e.bindTexture(R,X||ht[R]),$.type=R,$.texture=X)}function qe(){const R=gt[pt];R!==void 0&&R.type!==void 0&&(e.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function jt(){try{e.compressedTexImage2D(...arguments)}catch(R){Qt("WebGLState:",R)}}function T(){try{e.compressedTexImage3D(...arguments)}catch(R){Qt("WebGLState:",R)}}function g(){try{e.texSubImage2D(...arguments)}catch(R){Qt("WebGLState:",R)}}function F(){try{e.texSubImage3D(...arguments)}catch(R){Qt("WebGLState:",R)}}function V(){try{e.compressedTexSubImage2D(...arguments)}catch(R){Qt("WebGLState:",R)}}function q(){try{e.compressedTexSubImage3D(...arguments)}catch(R){Qt("WebGLState:",R)}}function ot(){try{e.texStorage2D(...arguments)}catch(R){Qt("WebGLState:",R)}}function ct(){try{e.texStorage3D(...arguments)}catch(R){Qt("WebGLState:",R)}}function K(){try{e.texImage2D(...arguments)}catch(R){Qt("WebGLState:",R)}}function J(){try{e.texImage3D(...arguments)}catch(R){Qt("WebGLState:",R)}}function ft(R){return f[R]!==void 0?f[R]:e.getParameter(R)}function bt(R,X){f[R]!==X&&(e.pixelStorei(R,X),f[R]=X)}function at(R){_e.equals(R)===!1&&(e.scissor(R.x,R.y,R.z,R.w),_e.copy(R))}function dt(R){$t.equals(R)===!1&&(e.viewport(R.x,R.y,R.z,R.w),$t.copy(R))}function Pt(R,X){let N=c.get(X);N===void 0&&(N=new WeakMap,c.set(X,N));let $=N.get(R);$===void 0&&($=e.getUniformBlockIndex(X,R.name),N.set(R,$))}function B(R,X){const $=c.get(X).get(R);l.get(X)!==$&&(e.uniformBlockBinding(X,$,R.__bindingPointIndex),l.set(X,$))}function tt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),a.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},f={},pt=null,gt={},h={},p=new WeakMap,_=[],S=null,m=!1,d=null,y=null,E=null,M=null,w=null,b=null,C=null,v=new Wt(0,0,0),A=0,D=!1,L=null,O=null,j=null,et=null,k=null,_e.set(0,0,e.canvas.width,e.canvas.height),$t.set(0,0,e.canvas.width,e.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:rt,disable:Ft,bindFramebuffer:Ot,drawBuffers:It,useProgram:ve,setBlending:Jt,setMaterial:Xt,setFlipSided:Te,setCullFace:xe,setLineWidth:Ie,setPolygonOffset:Ae,setScissorTest:Me,activeTexture:Se,bindTexture:I,unbindTexture:qe,compressedTexImage2D:jt,compressedTexImage3D:T,texImage2D:K,texImage3D:J,pixelStorei:bt,getParameter:ft,updateUBOMapping:Pt,uniformBlockBinding:B,texStorage2D:ot,texStorage3D:ct,texSubImage2D:g,texSubImage3D:F,compressedTexSubImage2D:V,compressedTexSubImage3D:q,scissor:at,viewport:dt,reset:tt}}function dM(e,t,n,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new yt,u=new WeakMap,f=new Set;let h;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(T,g){return _?new OffscreenCanvas(T,g):rl("canvas")}function m(T,g,F){let V=1;const q=jt(T);if((q.width>F||q.height>F)&&(V=F/Math.max(q.width,q.height)),V<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const ot=Math.floor(V*q.width),ct=Math.floor(V*q.height);h===void 0&&(h=S(ot,ct));const K=g?S(ot,ct):h;return K.width=ot,K.height=ct,K.getContext("2d").drawImage(T,0,0,ot,ct),Ut("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+ot+"x"+ct+")."),K}else return"data"in T&&Ut("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),T;return T}function d(T){return T.generateMipmaps}function y(T){e.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?e.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function M(T,g,F,V,q,ot=!1){if(T!==null){if(e[T]!==void 0)return e[T];Ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ct;V&&(ct=t.get("EXT_texture_norm16"),ct||Ut("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=g;if(g===e.RED&&(F===e.FLOAT&&(K=e.R32F),F===e.HALF_FLOAT&&(K=e.R16F),F===e.UNSIGNED_BYTE&&(K=e.R8),F===e.UNSIGNED_SHORT&&ct&&(K=ct.R16_EXT),F===e.SHORT&&ct&&(K=ct.R16_SNORM_EXT)),g===e.RED_INTEGER&&(F===e.UNSIGNED_BYTE&&(K=e.R8UI),F===e.UNSIGNED_SHORT&&(K=e.R16UI),F===e.UNSIGNED_INT&&(K=e.R32UI),F===e.BYTE&&(K=e.R8I),F===e.SHORT&&(K=e.R16I),F===e.INT&&(K=e.R32I)),g===e.RG&&(F===e.FLOAT&&(K=e.RG32F),F===e.HALF_FLOAT&&(K=e.RG16F),F===e.UNSIGNED_BYTE&&(K=e.RG8),F===e.UNSIGNED_SHORT&&ct&&(K=ct.RG16_EXT),F===e.SHORT&&ct&&(K=ct.RG16_SNORM_EXT)),g===e.RG_INTEGER&&(F===e.UNSIGNED_BYTE&&(K=e.RG8UI),F===e.UNSIGNED_SHORT&&(K=e.RG16UI),F===e.UNSIGNED_INT&&(K=e.RG32UI),F===e.BYTE&&(K=e.RG8I),F===e.SHORT&&(K=e.RG16I),F===e.INT&&(K=e.RG32I)),g===e.RGB_INTEGER&&(F===e.UNSIGNED_BYTE&&(K=e.RGB8UI),F===e.UNSIGNED_SHORT&&(K=e.RGB16UI),F===e.UNSIGNED_INT&&(K=e.RGB32UI),F===e.BYTE&&(K=e.RGB8I),F===e.SHORT&&(K=e.RGB16I),F===e.INT&&(K=e.RGB32I)),g===e.RGBA_INTEGER&&(F===e.UNSIGNED_BYTE&&(K=e.RGBA8UI),F===e.UNSIGNED_SHORT&&(K=e.RGBA16UI),F===e.UNSIGNED_INT&&(K=e.RGBA32UI),F===e.BYTE&&(K=e.RGBA8I),F===e.SHORT&&(K=e.RGBA16I),F===e.INT&&(K=e.RGBA32I)),g===e.RGB&&(F===e.UNSIGNED_SHORT&&ct&&(K=ct.RGB16_EXT),F===e.SHORT&&ct&&(K=ct.RGB16_SNORM_EXT),F===e.UNSIGNED_INT_5_9_9_9_REV&&(K=e.RGB9_E5),F===e.UNSIGNED_INT_10F_11F_11F_REV&&(K=e.R11F_G11F_B10F)),g===e.RGBA){const J=ot?il:Kt.getTransfer(q);F===e.FLOAT&&(K=e.RGBA32F),F===e.HALF_FLOAT&&(K=e.RGBA16F),F===e.UNSIGNED_BYTE&&(K=J===le?e.SRGB8_ALPHA8:e.RGBA8),F===e.UNSIGNED_SHORT&&ct&&(K=ct.RGBA16_EXT),F===e.SHORT&&ct&&(K=ct.RGBA16_SNORM_EXT),F===e.UNSIGNED_SHORT_4_4_4_4&&(K=e.RGBA4),F===e.UNSIGNED_SHORT_5_5_5_1&&(K=e.RGB5_A1)}return(K===e.R16F||K===e.R32F||K===e.RG16F||K===e.RG32F||K===e.RGBA16F||K===e.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function w(T,g){let F;return T?g===null||g===Li||g===Fa?F=e.DEPTH24_STENCIL8:g===Ti?F=e.DEPTH32F_STENCIL8:g===Na&&(F=e.DEPTH24_STENCIL8,Ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Li||g===Fa?F=e.DEPTH_COMPONENT24:g===Ti?F=e.DEPTH_COMPONENT32F:g===Na&&(F=e.DEPTH_COMPONENT16),F}function b(T,g){return d(T)===!0||T.isFramebufferTexture&&T.minFilter!==on&&T.minFilter!==ln?Math.log2(Math.max(g.width,g.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?g.mipmaps.length:1}function C(T){const g=T.target;g.removeEventListener("dispose",C),A(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&f.delete(g)}function v(T){const g=T.target;g.removeEventListener("dispose",v),L(g)}function A(T){const g=i.get(T);if(g.__webglInit===void 0)return;const F=T.source,V=p.get(F);if(V){const q=V[g.__cacheKey];q.usedTimes--,q.usedTimes===0&&D(T),Object.keys(V).length===0&&p.delete(F)}i.remove(T)}function D(T){const g=i.get(T);e.deleteTexture(g.__webglTexture);const F=T.source,V=p.get(F);delete V[g.__cacheKey],a.memory.textures--}function L(T){const g=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(g.__webglFramebuffer[V]))for(let q=0;q<g.__webglFramebuffer[V].length;q++)e.deleteFramebuffer(g.__webglFramebuffer[V][q]);else e.deleteFramebuffer(g.__webglFramebuffer[V]);g.__webglDepthbuffer&&e.deleteRenderbuffer(g.__webglDepthbuffer[V])}else{if(Array.isArray(g.__webglFramebuffer))for(let V=0;V<g.__webglFramebuffer.length;V++)e.deleteFramebuffer(g.__webglFramebuffer[V]);else e.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&e.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&e.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let V=0;V<g.__webglColorRenderbuffer.length;V++)g.__webglColorRenderbuffer[V]&&e.deleteRenderbuffer(g.__webglColorRenderbuffer[V]);g.__webglDepthRenderbuffer&&e.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const F=T.textures;for(let V=0,q=F.length;V<q;V++){const ot=i.get(F[V]);ot.__webglTexture&&(e.deleteTexture(ot.__webglTexture),a.memory.textures--),i.remove(F[V])}i.remove(T)}let O=0;function j(){O=0}function et(){return O}function k(T){O=T}function Z(){const T=O;return T>=s.maxTextures&&Ut("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),O+=1,T}function z(T){const g=[];return g.push(T.wrapS),g.push(T.wrapT),g.push(T.wrapR||0),g.push(T.magFilter),g.push(T.minFilter),g.push(T.anisotropy),g.push(T.internalFormat),g.push(T.format),g.push(T.type),g.push(T.generateMipmaps),g.push(T.premultiplyAlpha),g.push(T.flipY),g.push(T.unpackAlignment),g.push(T.colorSpace),g.join()}function nt(T,g){const F=i.get(T);if(T.isVideoTexture&&I(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&F.__version!==T.version){const V=T.image;if(V===null)Ut("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ut("WebGLRenderer: Texture marked for update but image is incomplete");else{Ft(F,T,g);return}}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,F.__webglTexture,e.TEXTURE0+g)}function st(T,g){const F=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){Ft(F,T,g);return}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,F.__webglTexture,e.TEXTURE0+g)}function pt(T,g){const F=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){Ft(F,T,g);return}n.bindTexture(e.TEXTURE_3D,F.__webglTexture,e.TEXTURE0+g)}function gt(T,g){const F=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&F.__version!==T.version){Ot(F,T,g);return}n.bindTexture(e.TEXTURE_CUBE_MAP,F.__webglTexture,e.TEXTURE0+g)}const xt={[Zc]:e.REPEAT,[Xi]:e.CLAMP_TO_EDGE,[$c]:e.MIRRORED_REPEAT},Zt={[on]:e.NEAREST,[g_]:e.NEAREST_MIPMAP_NEAREST,[no]:e.NEAREST_MIPMAP_LINEAR,[ln]:e.LINEAR,[jl]:e.LINEAR_MIPMAP_NEAREST,[Fs]:e.LINEAR_MIPMAP_LINEAR},_e={[x_]:e.NEVER,[b_]:e.ALWAYS,[M_]:e.LESS,[ou]:e.LEQUAL,[S_]:e.EQUAL,[lu]:e.GEQUAL,[y_]:e.GREATER,[E_]:e.NOTEQUAL};function $t(T,g){if(g.type===Ti&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===ln||g.magFilter===jl||g.magFilter===no||g.magFilter===Fs||g.minFilter===ln||g.minFilter===jl||g.minFilter===no||g.minFilter===Fs)&&Ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(T,e.TEXTURE_WRAP_S,xt[g.wrapS]),e.texParameteri(T,e.TEXTURE_WRAP_T,xt[g.wrapT]),(T===e.TEXTURE_3D||T===e.TEXTURE_2D_ARRAY)&&e.texParameteri(T,e.TEXTURE_WRAP_R,xt[g.wrapR]),e.texParameteri(T,e.TEXTURE_MAG_FILTER,Zt[g.magFilter]),e.texParameteri(T,e.TEXTURE_MIN_FILTER,Zt[g.minFilter]),g.compareFunction&&(e.texParameteri(T,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(T,e.TEXTURE_COMPARE_FUNC,_e[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===on||g.minFilter!==no&&g.minFilter!==Fs||g.type===Ti&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");e.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function Q(T,g){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,g.addEventListener("dispose",C));const V=g.source;let q=p.get(V);q===void 0&&(q={},p.set(V,q));const ot=z(g);if(ot!==T.__cacheKey){q[ot]===void 0&&(q[ot]={texture:e.createTexture(),usedTimes:0},a.memory.textures++,F=!0),q[ot].usedTimes++;const ct=q[T.__cacheKey];ct!==void 0&&(q[T.__cacheKey].usedTimes--,ct.usedTimes===0&&D(g)),T.__cacheKey=ot,T.__webglTexture=q[ot].texture}return F}function ht(T,g,F){return Math.floor(Math.floor(T/F)/g)}function rt(T,g,F,V){const ot=T.updateRanges;if(ot.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,g.width,g.height,F,V,g.data);else{ot.sort((bt,at)=>bt.start-at.start);let ct=0;for(let bt=1;bt<ot.length;bt++){const at=ot[ct],dt=ot[bt],Pt=at.start+at.count,B=ht(dt.start,g.width,4),tt=ht(at.start,g.width,4);dt.start<=Pt+1&&B===tt&&ht(dt.start+dt.count-1,g.width,4)===B?at.count=Math.max(at.count,dt.start+dt.count-at.start):(++ct,ot[ct]=dt)}ot.length=ct+1;const K=n.getParameter(e.UNPACK_ROW_LENGTH),J=n.getParameter(e.UNPACK_SKIP_PIXELS),ft=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,g.width);for(let bt=0,at=ot.length;bt<at;bt++){const dt=ot[bt],Pt=Math.floor(dt.start/4),B=Math.ceil(dt.count/4),tt=Pt%g.width,R=Math.floor(Pt/g.width),X=B,N=1;n.pixelStorei(e.UNPACK_SKIP_PIXELS,tt),n.pixelStorei(e.UNPACK_SKIP_ROWS,R),n.texSubImage2D(e.TEXTURE_2D,0,tt,R,X,N,F,V,g.data)}T.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,K),n.pixelStorei(e.UNPACK_SKIP_PIXELS,J),n.pixelStorei(e.UNPACK_SKIP_ROWS,ft)}}function Ft(T,g,F){let V=e.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(V=e.TEXTURE_2D_ARRAY),g.isData3DTexture&&(V=e.TEXTURE_3D);const q=Q(T,g),ot=g.source;n.bindTexture(V,T.__webglTexture,e.TEXTURE0+F);const ct=i.get(ot);if(ot.version!==ct.__version||q===!0){if(n.activeTexture(e.TEXTURE0+F),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){const N=Kt.getPrimaries(Kt.workingColorSpace),$=g.colorSpace===ds?null:Kt.getPrimaries(g.colorSpace),it=g.colorSpace===ds||N===$?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,it)}n.pixelStorei(e.UNPACK_ALIGNMENT,g.unpackAlignment);let J=m(g.image,!1,s.maxTextureSize);J=qe(g,J);const ft=r.convert(g.format,g.colorSpace),bt=r.convert(g.type);let at=M(g.internalFormat,ft,bt,g.normalized,g.colorSpace,g.isVideoTexture);$t(V,g);let dt;const Pt=g.mipmaps,B=g.isVideoTexture!==!0,tt=ct.__version===void 0||q===!0,R=ot.dataReady,X=b(g,J);if(g.isDepthTexture)at=w(g.format===Os,g.type),tt&&(B?n.texStorage2D(e.TEXTURE_2D,1,at,J.width,J.height):n.texImage2D(e.TEXTURE_2D,0,at,J.width,J.height,0,ft,bt,null));else if(g.isDataTexture)if(Pt.length>0){B&&tt&&n.texStorage2D(e.TEXTURE_2D,X,at,Pt[0].width,Pt[0].height);for(let N=0,$=Pt.length;N<$;N++)dt=Pt[N],B?R&&n.texSubImage2D(e.TEXTURE_2D,N,0,0,dt.width,dt.height,ft,bt,dt.data):n.texImage2D(e.TEXTURE_2D,N,at,dt.width,dt.height,0,ft,bt,dt.data);g.generateMipmaps=!1}else B?(tt&&n.texStorage2D(e.TEXTURE_2D,X,at,J.width,J.height),R&&rt(g,J,ft,bt)):n.texImage2D(e.TEXTURE_2D,0,at,J.width,J.height,0,ft,bt,J.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){B&&tt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,X,at,Pt[0].width,Pt[0].height,J.depth);for(let N=0,$=Pt.length;N<$;N++)if(dt=Pt[N],g.format!==hi)if(ft!==null)if(B){if(R)if(g.layerUpdates.size>0){const it=od(dt.width,dt.height,g.format,g.type);for(const Y of g.layerUpdates){const lt=dt.data.subarray(Y*it/dt.data.BYTES_PER_ELEMENT,(Y+1)*it/dt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,N,0,0,Y,dt.width,dt.height,1,ft,lt)}g.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,N,0,0,0,dt.width,dt.height,J.depth,ft,dt.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,N,at,dt.width,dt.height,J.depth,0,dt.data,0,0);else Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else B?R&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,N,0,0,0,dt.width,dt.height,J.depth,ft,bt,dt.data):n.texImage3D(e.TEXTURE_2D_ARRAY,N,at,dt.width,dt.height,J.depth,0,ft,bt,dt.data)}else{B&&tt&&n.texStorage2D(e.TEXTURE_2D,X,at,Pt[0].width,Pt[0].height);for(let N=0,$=Pt.length;N<$;N++)dt=Pt[N],g.format!==hi?ft!==null?B?R&&n.compressedTexSubImage2D(e.TEXTURE_2D,N,0,0,dt.width,dt.height,ft,dt.data):n.compressedTexImage2D(e.TEXTURE_2D,N,at,dt.width,dt.height,0,dt.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):B?R&&n.texSubImage2D(e.TEXTURE_2D,N,0,0,dt.width,dt.height,ft,bt,dt.data):n.texImage2D(e.TEXTURE_2D,N,at,dt.width,dt.height,0,ft,bt,dt.data)}else if(g.isDataArrayTexture)if(B){if(tt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,X,at,J.width,J.height,J.depth),R)if(g.layerUpdates.size>0){const N=od(J.width,J.height,g.format,g.type);for(const $ of g.layerUpdates){const it=J.data.subarray($*N/J.data.BYTES_PER_ELEMENT,($+1)*N/J.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,$,J.width,J.height,1,ft,bt,it)}g.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ft,bt,J.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,at,J.width,J.height,J.depth,0,ft,bt,J.data);else if(g.isData3DTexture)B?(tt&&n.texStorage3D(e.TEXTURE_3D,X,at,J.width,J.height,J.depth),R&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ft,bt,J.data)):n.texImage3D(e.TEXTURE_3D,0,at,J.width,J.height,J.depth,0,ft,bt,J.data);else if(g.isFramebufferTexture){if(tt)if(B)n.texStorage2D(e.TEXTURE_2D,X,at,J.width,J.height);else{let N=J.width,$=J.height;for(let it=0;it<X;it++)n.texImage2D(e.TEXTURE_2D,it,at,N,$,0,ft,bt,null),N>>=1,$>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in e){const N=e.canvas;if(N.hasAttribute("layoutsubtree")||N.setAttribute("layoutsubtree","true"),J.parentNode!==N){N.appendChild(J),f.add(g),N.onpaint=$=>{const it=$.changedElements;for(const Y of f)it.includes(Y.image)&&(Y.needsUpdate=!0)},N.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,J);else{const it=e.RGBA,Y=e.RGBA,lt=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,it,Y,lt,J)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Pt.length>0){if(B&&tt){const N=jt(Pt[0]);n.texStorage2D(e.TEXTURE_2D,X,at,N.width,N.height)}for(let N=0,$=Pt.length;N<$;N++)dt=Pt[N],B?R&&n.texSubImage2D(e.TEXTURE_2D,N,0,0,ft,bt,dt):n.texImage2D(e.TEXTURE_2D,N,at,ft,bt,dt);g.generateMipmaps=!1}else if(B){if(tt){const N=jt(J);n.texStorage2D(e.TEXTURE_2D,X,at,N.width,N.height)}R&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,ft,bt,J)}else n.texImage2D(e.TEXTURE_2D,0,at,ft,bt,J);d(g)&&y(V),ct.__version=ot.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function Ot(T,g,F){if(g.image.length!==6)return;const V=Q(T,g),q=g.source;n.bindTexture(e.TEXTURE_CUBE_MAP,T.__webglTexture,e.TEXTURE0+F);const ot=i.get(q);if(q.version!==ot.__version||V===!0){n.activeTexture(e.TEXTURE0+F);const ct=Kt.getPrimaries(Kt.workingColorSpace),K=g.colorSpace===ds?null:Kt.getPrimaries(g.colorSpace),J=g.colorSpace===ds||ct===K?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const ft=g.isCompressedTexture||g.image[0].isCompressedTexture,bt=g.image[0]&&g.image[0].isDataTexture,at=[];for(let Y=0;Y<6;Y++)!ft&&!bt?at[Y]=m(g.image[Y],!0,s.maxCubemapSize):at[Y]=bt?g.image[Y].image:g.image[Y],at[Y]=qe(g,at[Y]);const dt=at[0],Pt=r.convert(g.format,g.colorSpace),B=r.convert(g.type),tt=M(g.internalFormat,Pt,B,g.normalized,g.colorSpace),R=g.isVideoTexture!==!0,X=ot.__version===void 0||V===!0,N=q.dataReady;let $=b(g,dt);$t(e.TEXTURE_CUBE_MAP,g);let it;if(ft){R&&X&&n.texStorage2D(e.TEXTURE_CUBE_MAP,$,tt,dt.width,dt.height);for(let Y=0;Y<6;Y++){it=at[Y].mipmaps;for(let lt=0;lt<it.length;lt++){const ut=it[lt];g.format!==hi?Pt!==null?R?N&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,lt,0,0,ut.width,ut.height,Pt,ut.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,lt,tt,ut.width,ut.height,0,ut.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?N&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,lt,0,0,ut.width,ut.height,Pt,B,ut.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,lt,tt,ut.width,ut.height,0,Pt,B,ut.data)}}}else{if(it=g.mipmaps,R&&X){it.length>0&&$++;const Y=jt(at[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,$,tt,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(bt){R?N&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,at[Y].width,at[Y].height,Pt,B,at[Y].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,tt,at[Y].width,at[Y].height,0,Pt,B,at[Y].data);for(let lt=0;lt<it.length;lt++){const qt=it[lt].image[Y].image;R?N&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,lt+1,0,0,qt.width,qt.height,Pt,B,qt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,lt+1,tt,qt.width,qt.height,0,Pt,B,qt.data)}}else{R?N&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Pt,B,at[Y]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,tt,Pt,B,at[Y]);for(let lt=0;lt<it.length;lt++){const ut=it[lt];R?N&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,lt+1,0,0,Pt,B,ut.image[Y]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,lt+1,tt,Pt,B,ut.image[Y])}}}d(g)&&y(e.TEXTURE_CUBE_MAP),ot.__version=q.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function It(T,g,F,V,q,ot){const ct=r.convert(F.format,F.colorSpace),K=r.convert(F.type),J=M(F.internalFormat,ct,K,F.normalized,F.colorSpace),ft=i.get(g),bt=i.get(F);if(bt.__renderTarget=g,!ft.__hasExternalTextures){const at=Math.max(1,g.width>>ot),dt=Math.max(1,g.height>>ot);q===e.TEXTURE_3D||q===e.TEXTURE_2D_ARRAY?n.texImage3D(q,ot,J,at,dt,g.depth,0,ct,K,null):n.texImage2D(q,ot,J,at,dt,0,ct,K,null)}n.bindFramebuffer(e.FRAMEBUFFER,T),Se(g)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,V,q,bt.__webglTexture,0,Me(g)):(q===e.TEXTURE_2D||q>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,V,q,bt.__webglTexture,ot),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ve(T,g,F){if(e.bindRenderbuffer(e.RENDERBUFFER,T),g.depthBuffer){const V=g.depthTexture,q=V&&V.isDepthTexture?V.type:null,ot=w(g.stencilBuffer,q),ct=g.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Se(g)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Me(g),ot,g.width,g.height):F?e.renderbufferStorageMultisample(e.RENDERBUFFER,Me(g),ot,g.width,g.height):e.renderbufferStorage(e.RENDERBUFFER,ot,g.width,g.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,ct,e.RENDERBUFFER,T)}else{const V=g.textures;for(let q=0;q<V.length;q++){const ot=V[q],ct=r.convert(ot.format,ot.colorSpace),K=r.convert(ot.type),J=M(ot.internalFormat,ct,K,ot.normalized,ot.colorSpace);Se(g)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Me(g),J,g.width,g.height):F?e.renderbufferStorageMultisample(e.RENDERBUFFER,Me(g),J,g.width,g.height):e.renderbufferStorage(e.RENDERBUFFER,J,g.width,g.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Vt(T,g,F){const V=g.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,T),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const q=i.get(g.depthTexture);if(q.__renderTarget=g,(!q.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),V){if(q.__webglInit===void 0&&(q.__webglInit=!0,g.depthTexture.addEventListener("dispose",C)),q.__webglTexture===void 0){q.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,q.__webglTexture),$t(e.TEXTURE_CUBE_MAP,g.depthTexture);const ft=r.convert(g.depthTexture.format),bt=r.convert(g.depthTexture.type);let at;g.depthTexture.format===Zi?at=e.DEPTH_COMPONENT24:g.depthTexture.format===Os&&(at=e.DEPTH24_STENCIL8);for(let dt=0;dt<6;dt++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,at,g.width,g.height,0,ft,bt,null)}}else nt(g.depthTexture,0);const ot=q.__webglTexture,ct=Me(g),K=V?e.TEXTURE_CUBE_MAP_POSITIVE_X+F:e.TEXTURE_2D,J=g.depthTexture.format===Os?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(g.depthTexture.format===Zi)Se(g)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,J,K,ot,0,ct):e.framebufferTexture2D(e.FRAMEBUFFER,J,K,ot,0);else if(g.depthTexture.format===Os)Se(g)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,J,K,ot,0,ct):e.framebufferTexture2D(e.FRAMEBUFFER,J,K,ot,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ne(T){const g=i.get(T),F=T.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==T.depthTexture){const V=T.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),V){const q=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,V.removeEventListener("dispose",q)};V.addEventListener("dispose",q),g.__depthDisposeCallback=q}g.__boundDepthTexture=V}if(T.depthTexture&&!g.__autoAllocateDepthBuffer)if(F)for(let V=0;V<6;V++)Vt(g.__webglFramebuffer[V],T,V);else{const V=T.texture.mipmaps;V&&V.length>0?Vt(g.__webglFramebuffer[0],T,0):Vt(g.__webglFramebuffer,T,0)}else if(F){g.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(n.bindFramebuffer(e.FRAMEBUFFER,g.__webglFramebuffer[V]),g.__webglDepthbuffer[V]===void 0)g.__webglDepthbuffer[V]=e.createRenderbuffer(),ve(g.__webglDepthbuffer[V],T,!1);else{const q=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ot=g.__webglDepthbuffer[V];e.bindRenderbuffer(e.RENDERBUFFER,ot),e.framebufferRenderbuffer(e.FRAMEBUFFER,q,e.RENDERBUFFER,ot)}}else{const V=T.texture.mipmaps;if(V&&V.length>0?n.bindFramebuffer(e.FRAMEBUFFER,g.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=e.createRenderbuffer(),ve(g.__webglDepthbuffer,T,!1);else{const q=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ot=g.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,ot),e.framebufferRenderbuffer(e.FRAMEBUFFER,q,e.RENDERBUFFER,ot)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Jt(T,g,F){const V=i.get(T);g!==void 0&&It(V.__webglFramebuffer,T,T.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),F!==void 0&&ne(T)}function Xt(T){const g=T.texture,F=i.get(T),V=i.get(g);T.addEventListener("dispose",v);const q=T.textures,ot=T.isWebGLCubeRenderTarget===!0,ct=q.length>1;if(ct||(V.__webglTexture===void 0&&(V.__webglTexture=e.createTexture()),V.__version=g.version,a.memory.textures++),ot){F.__webglFramebuffer=[];for(let K=0;K<6;K++)if(g.mipmaps&&g.mipmaps.length>0){F.__webglFramebuffer[K]=[];for(let J=0;J<g.mipmaps.length;J++)F.__webglFramebuffer[K][J]=e.createFramebuffer()}else F.__webglFramebuffer[K]=e.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){F.__webglFramebuffer=[];for(let K=0;K<g.mipmaps.length;K++)F.__webglFramebuffer[K]=e.createFramebuffer()}else F.__webglFramebuffer=e.createFramebuffer();if(ct)for(let K=0,J=q.length;K<J;K++){const ft=i.get(q[K]);ft.__webglTexture===void 0&&(ft.__webglTexture=e.createTexture(),a.memory.textures++)}if(T.samples>0&&Se(T)===!1){F.__webglMultisampledFramebuffer=e.createFramebuffer(),F.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let K=0;K<q.length;K++){const J=q[K];F.__webglColorRenderbuffer[K]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,F.__webglColorRenderbuffer[K]);const ft=r.convert(J.format,J.colorSpace),bt=r.convert(J.type),at=M(J.internalFormat,ft,bt,J.normalized,J.colorSpace,T.isXRRenderTarget===!0),dt=Me(T);e.renderbufferStorageMultisample(e.RENDERBUFFER,dt,at,T.width,T.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+K,e.RENDERBUFFER,F.__webglColorRenderbuffer[K])}e.bindRenderbuffer(e.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=e.createRenderbuffer(),ve(F.__webglDepthRenderbuffer,T,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(ot){n.bindTexture(e.TEXTURE_CUBE_MAP,V.__webglTexture),$t(e.TEXTURE_CUBE_MAP,g);for(let K=0;K<6;K++)if(g.mipmaps&&g.mipmaps.length>0)for(let J=0;J<g.mipmaps.length;J++)It(F.__webglFramebuffer[K][J],T,g,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+K,J);else It(F.__webglFramebuffer[K],T,g,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);d(g)&&y(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ct){for(let K=0,J=q.length;K<J;K++){const ft=q[K],bt=i.get(ft);let at=e.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(at=T.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(at,bt.__webglTexture),$t(at,ft),It(F.__webglFramebuffer,T,ft,e.COLOR_ATTACHMENT0+K,at,0),d(ft)&&y(at)}n.unbindTexture()}else{let K=e.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(K=T.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(K,V.__webglTexture),$t(K,g),g.mipmaps&&g.mipmaps.length>0)for(let J=0;J<g.mipmaps.length;J++)It(F.__webglFramebuffer[J],T,g,e.COLOR_ATTACHMENT0,K,J);else It(F.__webglFramebuffer,T,g,e.COLOR_ATTACHMENT0,K,0);d(g)&&y(K),n.unbindTexture()}T.depthBuffer&&ne(T)}function Te(T){const g=T.textures;for(let F=0,V=g.length;F<V;F++){const q=g[F];if(d(q)){const ot=E(T),ct=i.get(q).__webglTexture;n.bindTexture(ot,ct),y(ot),n.unbindTexture()}}}const xe=[],Ie=[];function Ae(T){if(T.samples>0){if(Se(T)===!1){const g=T.textures,F=T.width,V=T.height;let q=e.COLOR_BUFFER_BIT;const ot=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ct=i.get(T),K=g.length>1;if(K)for(let ft=0;ft<g.length;ft++)n.bindFramebuffer(e.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ft,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,ct.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ft,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,ct.__webglMultisampledFramebuffer);const J=T.texture.mipmaps;J&&J.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,ct.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,ct.__webglFramebuffer);for(let ft=0;ft<g.length;ft++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(q|=e.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(q|=e.STENCIL_BUFFER_BIT)),K){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,ct.__webglColorRenderbuffer[ft]);const bt=i.get(g[ft]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,bt,0)}e.blitFramebuffer(0,0,F,V,0,0,F,V,q,e.NEAREST),l===!0&&(xe.length=0,Ie.length=0,xe.push(e.COLOR_ATTACHMENT0+ft),T.depthBuffer&&T.resolveDepthBuffer===!1&&(xe.push(ot),Ie.push(ot),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ie)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,xe))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),K)for(let ft=0;ft<g.length;ft++){n.bindFramebuffer(e.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ft,e.RENDERBUFFER,ct.__webglColorRenderbuffer[ft]);const bt=i.get(g[ft]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,ct.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ft,e.TEXTURE_2D,bt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,ct.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const g=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[g])}}}function Me(T){return Math.min(s.maxSamples,T.samples)}function Se(T){const g=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function I(T){const g=a.render.frame;u.get(T)!==g&&(u.set(T,g),T.update())}function qe(T,g){const F=T.colorSpace,V=T.format,q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==nl&&F!==ds&&(Kt.getTransfer(F)===le?(V!==hi||q!==ni)&&Ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qt("WebGLTextures: Unsupported texture color space:",F)),g}function jt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=Z,this.resetTextureUnits=j,this.getTextureUnits=et,this.setTextureUnits=k,this.setTexture2D=nt,this.setTexture2DArray=st,this.setTexture3D=pt,this.setTextureCube=gt,this.rebindTextures=Jt,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=It,this.useMultisampledRTT=Se,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function pM(e,t){function n(i,s=ds){let r;const a=Kt.getTransfer(s);if(i===ni)return e.UNSIGNED_BYTE;if(i===nu)return e.UNSIGNED_SHORT_4_4_4_4;if(i===iu)return e.UNSIGNED_SHORT_5_5_5_1;if(i===im)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===sm)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===em)return e.BYTE;if(i===nm)return e.SHORT;if(i===Na)return e.UNSIGNED_SHORT;if(i===eu)return e.INT;if(i===Li)return e.UNSIGNED_INT;if(i===Ti)return e.FLOAT;if(i===zn)return e.HALF_FLOAT;if(i===rm)return e.ALPHA;if(i===am)return e.RGB;if(i===hi)return e.RGBA;if(i===Zi)return e.DEPTH_COMPONENT;if(i===Os)return e.DEPTH_STENCIL;if(i===om)return e.RED;if(i===su)return e.RED_INTEGER;if(i===Ys)return e.RG;if(i===ru)return e.RG_INTEGER;if(i===au)return e.RGBA_INTEGER;if(i===Yo||i===qo||i===Ko||i===Zo)if(a===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Yo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===qo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Zo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Yo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===qo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ko)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Zo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Jc||i===jc||i===Qc||i===th)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Jc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===jc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Qc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===th)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===eh||i===nh||i===ih||i===sh||i===rh||i===tl||i===ah)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===eh||i===nh)return a===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ih)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===sh)return r.COMPRESSED_R11_EAC;if(i===rh)return r.COMPRESSED_SIGNED_R11_EAC;if(i===tl)return r.COMPRESSED_RG11_EAC;if(i===ah)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===oh||i===lh||i===ch||i===hh||i===uh||i===fh||i===dh||i===ph||i===mh||i===gh||i===_h||i===vh||i===xh||i===Mh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===oh)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===lh)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ch)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===hh)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===uh)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===fh)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===dh)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ph)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===mh)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===gh)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===_h)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===vh)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===xh)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Mh)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Sh||i===yh||i===Eh)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Sh)return a===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===yh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Eh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===bh||i===Th||i===el||i===Ah)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===bh)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Th)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===el)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ah)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Fa?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}const mM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class _M{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const i=new xm(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new mn({vertexShader:mM,fragmentShader:gM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new pn(new El(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class vM extends Ss{constructor(t,n){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,_=null;const S=typeof XRWebGLBinding<"u",m=new _M,d={},y=n.getContextAttributes();let E=null,M=null;const w=[],b=[],C=new yt;let v=null;const A=new ei;A.viewport=new Fe;const D=new ei;D.viewport=new Fe;const L=[A,D],O=new b1;let j=null,et=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ht=w[Q];return ht===void 0&&(ht=new sc,w[Q]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(Q){let ht=w[Q];return ht===void 0&&(ht=new sc,w[Q]=ht),ht.getGripSpace()},this.getHand=function(Q){let ht=w[Q];return ht===void 0&&(ht=new sc,w[Q]=ht),ht.getHandSpace()};function k(Q){const ht=b.indexOf(Q.inputSource);if(ht===-1)return;const rt=w[ht];rt!==void 0&&(rt.update(Q.inputSource,Q.frame,c||a),rt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function Z(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",z);for(let Q=0;Q<w.length;Q++){const ht=b[Q];ht!==null&&(b[Q]=null,w[Q].disconnect(ht))}j=null,et=null,m.reset();for(const Q in d)delete d[Q];t.setRenderTarget(E),p=null,h=null,f=null,s=null,M=null,$t.stop(),i.isPresenting=!1,t.setPixelRatio(v),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,i.isPresenting===!0&&Ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&Ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f===null&&S&&(f=new XRWebGLBinding(s,n)),f},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",z),y.xrCompatible!==!0&&await n.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(C),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let rt=null,Ft=null,Ot=null;y.depth&&(Ot=y.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,rt=y.stencil?Os:Zi,Ft=y.stencil?Fa:Li);const It={colorFormat:n.RGBA8,depthFormat:Ot,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(It),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),M=new Ln(h.textureWidth,h.textureHeight,{format:hi,type:ni,depthTexture:new Or(h.textureWidth,h.textureHeight,Ft,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const rt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,n,rt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new Ln(p.framebufferWidth,p.framebufferHeight,{format:hi,type:ni,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),$t.setContext(s),$t.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function z(Q){for(let ht=0;ht<Q.removed.length;ht++){const rt=Q.removed[ht],Ft=b.indexOf(rt);Ft>=0&&(b[Ft]=null,w[Ft].disconnect(rt))}for(let ht=0;ht<Q.added.length;ht++){const rt=Q.added[ht];let Ft=b.indexOf(rt);if(Ft===-1){for(let It=0;It<w.length;It++)if(It>=b.length){b.push(rt),Ft=It;break}else if(b[It]===null){b[It]=rt,Ft=It;break}if(Ft===-1)break}const Ot=w[Ft];Ot&&Ot.connect(rt)}}const nt=new P,st=new P;function pt(Q,ht,rt){nt.setFromMatrixPosition(ht.matrixWorld),st.setFromMatrixPosition(rt.matrixWorld);const Ft=nt.distanceTo(st),Ot=ht.projectionMatrix.elements,It=rt.projectionMatrix.elements,ve=Ot[14]/(Ot[10]-1),Vt=Ot[14]/(Ot[10]+1),ne=(Ot[9]+1)/Ot[5],Jt=(Ot[9]-1)/Ot[5],Xt=(Ot[8]-1)/Ot[0],Te=(It[8]+1)/It[0],xe=ve*Xt,Ie=ve*Te,Ae=Ft/(-Xt+Te),Me=Ae*-Xt;if(ht.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Me),Q.translateZ(Ae),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Ot[10]===-1)Q.projectionMatrix.copy(ht.projectionMatrix),Q.projectionMatrixInverse.copy(ht.projectionMatrixInverse);else{const Se=ve+Ae,I=Vt+Ae,qe=xe-Me,jt=Ie+(Ft-Me),T=ne*Vt/I*Se,g=Jt*Vt/I*Se;Q.projectionMatrix.makePerspective(qe,jt,T,g,Se,I),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function gt(Q,ht){ht===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ht.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let ht=Q.near,rt=Q.far;m.texture!==null&&(m.depthNear>0&&(ht=m.depthNear),m.depthFar>0&&(rt=m.depthFar)),O.near=D.near=A.near=ht,O.far=D.far=A.far=rt,(j!==O.near||et!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),j=O.near,et=O.far),O.layers.mask=Q.layers.mask|6,A.layers.mask=O.layers.mask&-5,D.layers.mask=O.layers.mask&-3;const Ft=Q.parent,Ot=O.cameras;gt(O,Ft);for(let It=0;It<Ot.length;It++)gt(Ot[It],Ft);Ot.length===2?pt(O,A,D):O.projectionMatrix.copy(A.projectionMatrix),xt(Q,O,Ft)};function xt(Q,ht,rt){rt===null?Q.matrix.copy(ht.matrixWorld):(Q.matrix.copy(rt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ht.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ht.projectionMatrix),Q.projectionMatrixInverse.copy(ht.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Oa*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(Q){l=Q,h!==null&&(h.fixedFoveation=Q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(Q){return d[Q]};let Zt=null;function _e(Q,ht){if(u=ht.getViewerPose(c||a),_=ht,u!==null){const rt=u.views;p!==null&&(t.setRenderTargetFramebuffer(M,p.framebuffer),t.setRenderTarget(M));let Ft=!1;rt.length!==O.cameras.length&&(O.cameras.length=0,Ft=!0);for(let Vt=0;Vt<rt.length;Vt++){const ne=rt[Vt];let Jt=null;if(p!==null)Jt=p.getViewport(ne);else{const Te=f.getViewSubImage(h,ne);Jt=Te.viewport,Vt===0&&(t.setRenderTargetTextures(M,Te.colorTexture,Te.depthStencilTexture),t.setRenderTarget(M))}let Xt=L[Vt];Xt===void 0&&(Xt=new ei,Xt.layers.enable(Vt),Xt.viewport=new Fe,L[Vt]=Xt),Xt.matrix.fromArray(ne.transform.matrix),Xt.matrix.decompose(Xt.position,Xt.quaternion,Xt.scale),Xt.projectionMatrix.fromArray(ne.projectionMatrix),Xt.projectionMatrixInverse.copy(Xt.projectionMatrix).invert(),Xt.viewport.set(Jt.x,Jt.y,Jt.width,Jt.height),Vt===0&&(O.matrix.copy(Xt.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ft===!0&&O.cameras.push(Xt)}const Ot=s.enabledFeatures;if(Ot&&Ot.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){f=i.getBinding();const Vt=f.getDepthInformation(rt[0]);Vt&&Vt.isValid&&Vt.texture&&m.init(Vt,s.renderState)}if(Ot&&Ot.includes("camera-access")&&S){t.state.unbindTexture(),f=i.getBinding();for(let Vt=0;Vt<rt.length;Vt++){const ne=rt[Vt].camera;if(ne){let Jt=d[ne];Jt||(Jt=new xm,d[ne]=Jt);const Xt=f.getCameraImage(ne);Jt.sourceTexture=Xt}}}}for(let rt=0;rt<w.length;rt++){const Ft=b[rt],Ot=w[rt];Ft!==null&&Ot!==void 0&&Ot.update(Ft,ht,c||a)}Zt&&Zt(Q,ht),ht.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ht}),_=null}const $t=new ym;$t.setAnimationLoop(_e),this.setAnimationLoop=function(Q){Zt=Q},this.dispose=function(){}}}const xM=new Le,Cm=new Bt;Cm.set(-1,0,0,0,1,0,0,0,1);function MM(e,t){function n(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Mm(e)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,y,E,M){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(m,d):d.isMeshLambertMaterial?(r(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(m,d),f(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,M)):d.isMeshMatcapMaterial?(r(m,d),_(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),S(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,y,E):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,n(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Pn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,n(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Pn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,n(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,n(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const y=t.get(d),E=y.envMap,M=y.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(xM.makeRotationFromEuler(M)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Cm),m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,y,E){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*y,m.scale.value=E*.5,d.map&&(m.map.value=d.map,n(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,y){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Pn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,d){d.matcap&&(m.matcap.value=d.matcap)}function S(m,d){const y=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function SM(e,t,n,i){let s={},r={},a=[];const o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,w){const b=w.program;i.uniformBlockBinding(M,b)}function c(M,w){let b=s[M.id];b===void 0&&(m(M),b=u(M),s[M.id]=b,M.addEventListener("dispose",y));const C=w.program;i.updateUBOMapping(M,C);const v=t.render.frame;r[M.id]!==v&&(h(M),r[M.id]=v)}function u(M){const w=f();M.__bindingPointIndex=w;const b=e.createBuffer(),C=M.__size,v=M.usage;return e.bindBuffer(e.UNIFORM_BUFFER,b),e.bufferData(e.UNIFORM_BUFFER,C,v),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,w,b),b}function f(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const w=s[M.id],b=M.uniforms,C=M.__cache;e.bindBuffer(e.UNIFORM_BUFFER,w);for(let v=0,A=b.length;v<A;v++){const D=b[v];if(Array.isArray(D))for(let L=0,O=D.length;L<O;L++)p(D[L],v,L,C);else p(D,v,0,C)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(M,w,b,C){if(S(M,w,b,C)===!0){const v=M.__offset,A=M.value;if(Array.isArray(A)){let D=0;for(let L=0;L<A.length;L++){const O=A[L],j=d(O);_(O,M.__data,D),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(D+=j.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(A,M.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,v,M.__data)}}function _(M,w,b){typeof M=="number"||typeof M=="boolean"?w[0]=M:M.isMatrix3?(w[0]=M.elements[0],w[1]=M.elements[1],w[2]=M.elements[2],w[3]=0,w[4]=M.elements[3],w[5]=M.elements[4],w[6]=M.elements[5],w[7]=0,w[8]=M.elements[6],w[9]=M.elements[7],w[10]=M.elements[8],w[11]=0):ArrayBuffer.isView(M)?w.set(new M.constructor(M.buffer,M.byteOffset,w.length)):M.toArray(w,b)}function S(M,w,b,C){const v=M.value,A=w+"_"+b;if(C[A]===void 0)return typeof v=="number"||typeof v=="boolean"?C[A]=v:ArrayBuffer.isView(v)?C[A]=v.slice():C[A]=v.clone(),!0;{const D=C[A];if(typeof v=="number"||typeof v=="boolean"){if(D!==v)return C[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(D.equals(v)===!1)return D.copy(v),!0}}return!1}function m(M){const w=M.uniforms;let b=0;const C=16;for(let A=0,D=w.length;A<D;A++){const L=Array.isArray(w[A])?w[A]:[w[A]];for(let O=0,j=L.length;O<j;O++){const et=L[O],k=Array.isArray(et.value)?et.value:[et.value];for(let Z=0,z=k.length;Z<z;Z++){const nt=k[Z],st=d(nt),pt=b%C,gt=pt%st.boundary,xt=pt+gt;b+=gt,xt!==0&&C-xt<st.storage&&(b+=C-xt),et.__data=new Float32Array(st.storage/Float32Array.BYTES_PER_ELEMENT),et.__offset=b,b+=st.storage}}}const v=b%C;return v>0&&(b+=C-v),M.__size=b,M.__cache={},this}function d(M){const w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?Ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(w.boundary=16,w.storage=M.byteLength):Ut("WebGLRenderer: Unsupported uniform value type.",M),w}function y(M){const w=M.target;w.removeEventListener("dispose",y);const b=a.indexOf(w.__bindingPointIndex);a.splice(b,1),e.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function E(){for(const M in s)e.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:E}}const yM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Mi=null;function EM(){return Mi===null&&(Mi=new f1(yM,16,16,Ys,zn),Mi.name="DFG_LUT",Mi.minFilter=ln,Mi.magFilter=ln,Mi.wrapS=Xi,Mi.wrapT=Xi,Mi.generateMipmaps=!1,Mi.needsUpdate=!0),Mi}class bM{constructor(t={}){const{canvas:n=A_(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:p=ni}=t;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const S=p,m=new Set([au,ru,su]),d=new Set([ni,Li,Na,Fa,nu,iu]),y=new Uint32Array(4),E=new Int32Array(4),M=new P;let w=null,b=null;const C=[],v=[];let A=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let L=!1,O=null,j=null,et=null,k=null;this._outputColorSpace=ti;let Z=0,z=0,nt=null,st=-1,pt=null;const gt=new Fe,xt=new Fe;let Zt=null;const _e=new Wt(0);let $t=0,Q=n.width,ht=n.height,rt=1,Ft=null,Ot=null;const It=new Fe(0,0,Q,ht),ve=new Fe(0,0,Q,ht);let Vt=!1;const ne=new gm;let Jt=!1,Xt=!1;const Te=new Le,xe=new P,Ie=new Fe,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Me=!1;function Se(){return nt===null?rt:1}let I=i;function qe(x,U){return n.getContext(x,U)}try{const x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Qh}`),n.addEventListener("webglcontextlost",qt,!1),n.addEventListener("webglcontextrestored",zt,!1),n.addEventListener("webglcontextcreationerror",we,!1),I===null){const U="webgl2";if(I=qe(U,x),I===null)throw qe(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(x){throw Qt("WebGLRenderer: "+x.message),x}let jt,T,g,F,V,q,ot,ct,K,J,ft,bt,at,dt,Pt,B,tt,R,X,N,$,it,Y;function lt(){jt=new Ex(I),jt.init(),$=new pM(I,jt),T=new mx(I,jt,t,$),g=new fM(I,jt),T.reversedDepthBuffer&&h&&g.buffers.depth.setReversed(!0),j=I.createFramebuffer(),et=I.createFramebuffer(),k=I.createFramebuffer(),F=new Ax(I),V=new j3,q=new dM(I,jt,g,V,T,$,F),ot=new yx(D),ct=new P1(I),it=new dx(I,ct),K=new bx(I,ct,F,it),J=new Rx(I,K,ct,it,F),R=new wx(I,T,q),Pt=new gx(V),ft=new J3(D,ot,jt,T,it,Pt),bt=new MM(D,V),at=new tM,dt=new aM(jt),tt=new fx(D,ot,g,J,_,l),B=new uM(D,J,T),Y=new SM(I,F,T,g),X=new px(I,jt,F),N=new Tx(I,jt,F),F.programs=ft.programs,D.capabilities=T,D.extensions=jt,D.properties=V,D.renderLists=at,D.shadowMap=B,D.state=g,D.info=F}lt(),S!==ni&&(A=new Px(S,n.width,n.height,o,s,r));const ut=new vM(D,I);this.xr=ut,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const x=jt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=jt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return rt},this.setPixelRatio=function(x){x!==void 0&&(rt=x,this.setSize(Q,ht,!1))},this.getSize=function(x){return x.set(Q,ht)},this.setSize=function(x,U,W=!0){if(ut.isPresenting){Ut("WebGLRenderer: Can't change size while VR device is presenting.");return}Q=x,ht=U,n.width=Math.floor(x*rt),n.height=Math.floor(U*rt),W===!0&&(n.style.width=x+"px",n.style.height=U+"px"),A!==null&&A.setSize(n.width,n.height),this.setViewport(0,0,x,U)},this.getDrawingBufferSize=function(x){return x.set(Q*rt,ht*rt).floor()},this.setDrawingBufferSize=function(x,U,W){Q=x,ht=U,rt=W,n.width=Math.floor(x*W),n.height=Math.floor(U*W),this.setViewport(0,0,x,U)},this.setEffects=function(x){if(S===ni){Qt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let U=0;U<x.length;U++)if(x[U].isOutputPass===!0){Ut("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(gt)},this.getViewport=function(x){return x.copy(It)},this.setViewport=function(x,U,W,G){x.isVector4?It.set(x.x,x.y,x.z,x.w):It.set(x,U,W,G),g.viewport(gt.copy(It).multiplyScalar(rt).round())},this.getScissor=function(x){return x.copy(ve)},this.setScissor=function(x,U,W,G){x.isVector4?ve.set(x.x,x.y,x.z,x.w):ve.set(x,U,W,G),g.scissor(xt.copy(ve).multiplyScalar(rt).round())},this.getScissorTest=function(){return Vt},this.setScissorTest=function(x){g.setScissorTest(Vt=x)},this.setOpaqueSort=function(x){Ft=x},this.setTransparentSort=function(x){Ot=x},this.getClearColor=function(x){return x.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(x=!0,U=!0,W=!0){let G=0;if(x){let H=!1;if(nt!==null){const vt=nt.texture.format;H=m.has(vt)}if(H){const vt=nt.texture.type,St=d.has(vt),_t=tt.getClearColor(),Tt=tt.getClearAlpha(),Rt=_t.r,kt=_t.g,Ht=_t.b;St?(y[0]=Rt,y[1]=kt,y[2]=Ht,y[3]=Tt,I.clearBufferuiv(I.COLOR,0,y)):(E[0]=Rt,E[1]=kt,E[2]=Ht,E[3]=Tt,I.clearBufferiv(I.COLOR,0,E))}else G|=I.COLOR_BUFFER_BIT}U&&(G|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(G|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&I.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(x){x.setRenderer(this),O=x},this.dispose=function(){n.removeEventListener("webglcontextlost",qt,!1),n.removeEventListener("webglcontextrestored",zt,!1),n.removeEventListener("webglcontextcreationerror",we,!1),tt.dispose(),at.dispose(),dt.dispose(),V.dispose(),ot.dispose(),J.dispose(),it.dispose(),Y.dispose(),ft.dispose(),ut.dispose(),ut.removeEventListener("sessionstart",pa),ut.removeEventListener("sessionend",ma),gi.stop()};function qt(x){x.preventDefault(),al("WebGLRenderer: Context Lost."),L=!0}function zt(){al("WebGLRenderer: Context Restored."),L=!1;const x=F.autoReset,U=B.enabled,W=B.autoUpdate,G=B.needsUpdate,H=B.type;lt(),F.autoReset=x,B.enabled=U,B.autoUpdate=W,B.needsUpdate=G,B.type=H}function we(x){Qt("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Kn(x){const U=x.target;U.removeEventListener("dispose",Kn),Zl(U)}function Zl(x){fa(x),V.remove(x)}function fa(x){const U=V.get(x).programs;U!==void 0&&(U.forEach(function(W){ft.releaseProgram(W)}),x.isShaderMaterial&&ft.releaseShaderCache(x))}this.renderBufferDirect=function(x,U,W,G,H,vt){U===null&&(U=Ae);const St=H.isMesh&&H.matrixWorld.determinantAffine()<0,_t=Vg(x,U,W,G,H);g.setMaterial(G,St);let Tt=W.index,Rt=1;if(G.wireframe===!0){if(Tt=K.getWireframeAttribute(W),Tt===void 0)return;Rt=2}const kt=W.drawRange,Ht=W.attributes.position;let Lt=kt.start*Rt,he=(kt.start+kt.count)*Rt;vt!==null&&(Lt=Math.max(Lt,vt.start*Rt),he=Math.min(he,(vt.start+vt.count)*Rt)),Tt!==null?(Lt=Math.max(Lt,0),he=Math.min(he,Tt.count)):Ht!=null&&(Lt=Math.max(Lt,0),he=Math.min(he,Ht.count));const ke=he-Lt;if(ke<0||ke===1/0)return;it.setup(H,G,_t,W,Tt);let Ue,de=X;if(Tt!==null&&(Ue=ct.get(Tt),de=N,de.setIndex(Ue)),H.isMesh)G.wireframe===!0?(g.setLineWidth(G.wireframeLinewidth*Se()),de.setMode(I.LINES)):de.setMode(I.TRIANGLES);else if(H.isLine){let hn=G.linewidth;hn===void 0&&(hn=1),g.setLineWidth(hn*Se()),H.isLineSegments?de.setMode(I.LINES):H.isLineLoop?de.setMode(I.LINE_LOOP):de.setMode(I.LINE_STRIP)}else H.isPoints?de.setMode(I.POINTS):H.isSprite&&de.setMode(I.TRIANGLES);if(H.isBatchedMesh)if(jt.get("WEBGL_multi_draw"))de.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const hn=H._multiDrawStarts,Mt=H._multiDrawCounts,In=H._multiDrawCount,ie=Tt?ct.get(Tt).bytesPerElement:1,Zn=V.get(G).currentProgram.getUniforms();for(let vi=0;vi<In;vi++)Zn.setValue(I,"_gl_DrawID",vi),de.render(hn[vi]/ie,Mt[vi])}else if(H.isInstancedMesh)de.renderInstances(Lt,ke,H.count);else if(W.isInstancedBufferGeometry){const hn=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Mt=Math.min(W.instanceCount,hn);de.renderInstances(Lt,ke,Mt)}else de.render(Lt,ke)};function er(x,U,W){x.transparent===!0&&x.side===bi&&x.forceSinglePass===!1?(x.side=Pn,x.needsUpdate=!0,eo(x,U,W),x.side=_s,x.needsUpdate=!0,eo(x,U,W),x.side=bi):eo(x,U,W)}this.compile=function(x,U,W=null){W===null&&(W=x),b=dt.get(W),b.init(U),v.push(b),W.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(b.pushLight(H),H.castShadow&&b.pushShadow(H))}),x!==W&&x.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(b.pushLight(H),H.castShadow&&b.pushShadow(H))}),b.setupLights();const G=new Set;return x.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const vt=H.material;if(vt)if(Array.isArray(vt))for(let St=0;St<vt.length;St++){const _t=vt[St];er(_t,W,H),G.add(_t)}else er(vt,W,H),G.add(vt)}),b=v.pop(),G},this.compileAsync=function(x,U,W=null){const G=this.compile(x,U,W);return new Promise(H=>{function vt(){if(G.forEach(function(St){V.get(St).currentProgram.isReady()&&G.delete(St)}),G.size===0){H(x);return}setTimeout(vt,10)}jt.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let Es=null;function da(x){Es&&Es(x)}function pa(){gi.stop()}function ma(){gi.start()}const gi=new ym;gi.setAnimationLoop(da),typeof self<"u"&&gi.setContext(self),this.setAnimationLoop=function(x){Es=x,ut.setAnimationLoop(x),x===null?gi.stop():gi.start()},ut.addEventListener("sessionstart",pa),ut.addEventListener("sessionend",ma),this.render=function(x,U){if(U!==void 0&&U.isCamera!==!0){Qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;O!==null&&O.renderStart(x,U);const W=ut.enabled===!0&&ut.isPresenting===!0,G=A!==null&&(nt===null||W)&&A.begin(D,nt);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ut.enabled===!0&&ut.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(ut.cameraAutoUpdate===!0&&ut.updateCamera(U),U=ut.getCamera()),x.isScene===!0&&x.onBeforeRender(D,x,U,nt),b=dt.get(x,v.length),b.init(U),b.state.textureUnits=q.getTextureUnits(),v.push(b),Te.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),ne.setFromProjectionMatrix(Te,Ai,U.reversedDepth),Xt=this.localClippingEnabled,Jt=Pt.init(this.clippingPlanes,Xt),w=at.get(x,C.length),w.init(),C.push(w),ut.enabled===!0&&ut.isPresenting===!0){const St=D.xr.getDepthSensingMesh();St!==null&&Be(St,U,-1/0,D.sortObjects)}Be(x,U,0,D.sortObjects),w.finish(),D.sortObjects===!0&&w.sort(Ft,Ot,U.reversedDepth),Me=ut.enabled===!1||ut.isPresenting===!1||ut.hasDepthSensing()===!1,Me&&tt.addToRenderList(w,x),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Jt===!0&&Pt.beginShadows();const H=b.state.shadowsArray;if(B.render(H,x,U),Jt===!0&&Pt.endShadows(),(G&&A.hasRenderPass())===!1){const St=w.opaque,_t=w.transmissive;if(b.setupLights(),U.isArrayCamera){const Tt=U.cameras;if(_t.length>0)for(let Rt=0,kt=Tt.length;Rt<kt;Rt++){const Ht=Tt[Rt];Sn(St,_t,x,Ht)}Me&&tt.render(x);for(let Rt=0,kt=Tt.length;Rt<kt;Rt++){const Ht=Tt[Rt];_i(w,x,Ht,Ht.viewport)}}else _t.length>0&&Sn(St,_t,x,U),Me&&tt.render(x),_i(w,x,U)}nt!==null&&z===0&&(q.updateMultisampleRenderTarget(nt),q.updateRenderTargetMipmap(nt)),G&&A.end(D),x.isScene===!0&&x.onAfterRender(D,x,U),it.resetDefaultState(),st=-1,pt=null,v.pop(),v.length>0?(b=v[v.length-1],q.setTextureUnits(b.state.textureUnits),Jt===!0&&Pt.setGlobalState(D.clippingPlanes,b.state.camera)):b=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,O!==null&&O.renderEnd()};function Be(x,U,W,G){if(x.visible===!1)return;if(x.layers.test(U.layers)){if(x.isGroup)W=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(U);else if(x.isLightProbeGrid)b.pushLightProbeGrid(x);else if(x.isLight)b.pushLight(x),x.castShadow&&b.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||ne.intersectsSprite(x)){G&&Ie.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Te);const St=J.update(x),_t=x.material;_t.visible&&w.push(x,St,_t,W,Ie.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||ne.intersectsObject(x))){const St=J.update(x),_t=x.material;if(G&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ie.copy(x.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),Ie.copy(St.boundingSphere.center)),Ie.applyMatrix4(x.matrixWorld).applyMatrix4(Te)),Array.isArray(_t)){const Tt=St.groups;for(let Rt=0,kt=Tt.length;Rt<kt;Rt++){const Ht=Tt[Rt],Lt=_t[Ht.materialIndex];Lt&&Lt.visible&&w.push(x,St,Lt,W,Ie.z,Ht)}}else _t.visible&&w.push(x,St,_t,W,Ie.z,null)}}const vt=x.children;for(let St=0,_t=vt.length;St<_t;St++)Be(vt[St],U,W,G)}function _i(x,U,W,G){const{opaque:H,transmissive:vt,transparent:St}=x;b.setupLightsView(W),Jt===!0&&Pt.setGlobalState(D.clippingPlanes,W),G&&g.viewport(gt.copy(G)),H.length>0&&Ve(H,U,W),vt.length>0&&Ve(vt,U,W),St.length>0&&Ve(St,U,W),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function Sn(x,U,W,G){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[G.id]===void 0){const Lt=jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[G.id]=new Ln(1,1,{generateMipmaps:!0,type:Lt?zn:ni,minFilter:Fs,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}const vt=b.state.transmissionRenderTarget[G.id],St=G.viewport||gt;vt.setSize(St.z*D.transmissionResolutionScale,St.w*D.transmissionResolutionScale);const _t=D.getRenderTarget(),Tt=D.getActiveCubeFace(),Rt=D.getActiveMipmapLevel();D.setRenderTarget(vt),D.getClearColor(_e),$t=D.getClearAlpha(),$t<1&&D.setClearColor(16777215,.5),D.clear(),Me&&tt.render(W);const kt=D.toneMapping;D.toneMapping=Ci;const Ht=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),b.setupLightsView(G),Jt===!0&&Pt.setGlobalState(D.clippingPlanes,G),Ve(x,W,G),q.updateMultisampleRenderTarget(vt),q.updateRenderTargetMipmap(vt),jt.has("WEBGL_multisampled_render_to_texture")===!1){let Lt=!1;for(let he=0,ke=U.length;he<ke;he++){const Ue=U[he],{object:de,geometry:hn,material:Mt,group:In}=Ue;if(Mt.side===bi&&de.layers.test(G.layers)){const ie=Mt.side;Mt.side=Pn,Mt.needsUpdate=!0,yf(de,W,G,hn,Mt,In),Mt.side=ie,Mt.needsUpdate=!0,Lt=!0}}Lt===!0&&(q.updateMultisampleRenderTarget(vt),q.updateRenderTargetMipmap(vt))}D.setRenderTarget(_t,Tt,Rt),D.setClearColor(_e,$t),Ht!==void 0&&(G.viewport=Ht),D.toneMapping=kt}function Ve(x,U,W){const G=U.isScene===!0?U.overrideMaterial:null;for(let H=0,vt=x.length;H<vt;H++){const St=x[H],{object:_t,geometry:Tt,group:Rt}=St;let kt=St.material;kt.allowOverride===!0&&G!==null&&(kt=G),_t.layers.test(W.layers)&&yf(_t,U,W,Tt,kt,Rt)}}function yf(x,U,W,G,H,vt){x.onBeforeRender(D,U,W,G,H,vt),x.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),H.onBeforeRender(D,U,W,G,x,vt),H.transparent===!0&&H.side===bi&&H.forceSinglePass===!1?(H.side=Pn,H.needsUpdate=!0,D.renderBufferDirect(W,U,G,H,x,vt),H.side=_s,H.needsUpdate=!0,D.renderBufferDirect(W,U,G,H,x,vt),H.side=bi):D.renderBufferDirect(W,U,G,H,x,vt),x.onAfterRender(D,U,W,G,H,vt)}function eo(x,U,W){U.isScene!==!0&&(U=Ae);const G=V.get(x),H=b.state.lights,vt=b.state.shadowsArray,St=H.state.version,_t=ft.getParameters(x,H.state,vt,U,W,b.state.lightProbeGridArray),Tt=ft.getProgramCacheKey(_t);let Rt=G.programs;G.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?U.environment:null,G.fog=U.fog;const kt=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;G.envMap=ot.get(x.envMap||G.environment,kt),G.envMapRotation=G.environment!==null&&x.envMap===null?U.environmentRotation:x.envMapRotation,Rt===void 0&&(x.addEventListener("dispose",Kn),Rt=new Map,G.programs=Rt);let Ht=Rt.get(Tt);if(Ht!==void 0){if(G.currentProgram===Ht&&G.lightsStateVersion===St)return bf(x,_t),Ht}else _t.uniforms=ft.getUniforms(x),O!==null&&x.isNodeMaterial&&O.build(x,W,_t),x.onBeforeCompile(_t,D),Ht=ft.acquireProgram(_t,Tt),Rt.set(Tt,Ht),G.uniforms=_t.uniforms;const Lt=G.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Lt.clippingPlanes=Pt.uniform),bf(x,_t),G.needsLights=Wg(x),G.lightsStateVersion=St,G.needsLights&&(Lt.ambientLightColor.value=H.state.ambient,Lt.lightProbe.value=H.state.probe,Lt.directionalLights.value=H.state.directional,Lt.directionalLightShadows.value=H.state.directionalShadow,Lt.spotLights.value=H.state.spot,Lt.spotLightShadows.value=H.state.spotShadow,Lt.rectAreaLights.value=H.state.rectArea,Lt.ltc_1.value=H.state.rectAreaLTC1,Lt.ltc_2.value=H.state.rectAreaLTC2,Lt.pointLights.value=H.state.point,Lt.pointLightShadows.value=H.state.pointShadow,Lt.hemisphereLights.value=H.state.hemi,Lt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Lt.spotLightMatrix.value=H.state.spotLightMatrix,Lt.spotLightMap.value=H.state.spotLightMap,Lt.pointShadowMatrix.value=H.state.pointShadowMatrix),G.lightProbeGrid=b.state.lightProbeGridArray.length>0,G.currentProgram=Ht,G.uniformsList=null,Ht}function Ef(x){if(x.uniformsList===null){const U=x.currentProgram.getUniforms();x.uniformsList=$o.seqWithValue(U.seq,x.uniforms)}return x.uniformsList}function bf(x,U){const W=V.get(x);W.outputColorSpace=U.outputColorSpace,W.batching=U.batching,W.batchingColor=U.batchingColor,W.instancing=U.instancing,W.instancingColor=U.instancingColor,W.instancingMorph=U.instancingMorph,W.skinning=U.skinning,W.morphTargets=U.morphTargets,W.morphNormals=U.morphNormals,W.morphColors=U.morphColors,W.morphTargetsCount=U.morphTargetsCount,W.numClippingPlanes=U.numClippingPlanes,W.numIntersection=U.numClipIntersection,W.vertexAlphas=U.vertexAlphas,W.vertexTangents=U.vertexTangents,W.toneMapping=U.toneMapping}function Gg(x,U){if(x.length===0)return null;if(x.length===1)return x[0].texture!==null?x[0]:null;M.setFromMatrixPosition(U.matrixWorld);for(let W=0,G=x.length;W<G;W++){const H=x[W];if(H.texture!==null&&H.boundingBox.containsPoint(M))return H}return null}function Vg(x,U,W,G,H){U.isScene!==!0&&(U=Ae),q.resetTextureUnits();const vt=U.fog,St=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?U.environment:null,_t=nt===null?D.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Kt.workingColorSpace,Tt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Rt=ot.get(G.envMap||St,Tt),kt=G.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ht=!!W.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Lt=!!W.morphAttributes.position,he=!!W.morphAttributes.normal,ke=!!W.morphAttributes.color;let Ue=Ci;G.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Ue=D.toneMapping);const de=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,hn=de!==void 0?de.length:0,Mt=V.get(G),In=b.state.lights;if(Jt===!0&&(Xt===!0||x!==pt)){const ge=x===pt&&G.id===st;Pt.setState(G,x,ge)}let ie=!1;G.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==In.state.version||Mt.outputColorSpace!==_t||H.isBatchedMesh&&Mt.batching===!1||!H.isBatchedMesh&&Mt.batching===!0||H.isBatchedMesh&&Mt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Mt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Mt.instancing===!1||!H.isInstancedMesh&&Mt.instancing===!0||H.isSkinnedMesh&&Mt.skinning===!1||!H.isSkinnedMesh&&Mt.skinning===!0||H.isInstancedMesh&&Mt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Mt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Mt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Mt.instancingMorph===!1&&H.morphTexture!==null||Mt.envMap!==Rt||G.fog===!0&&Mt.fog!==vt||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==Pt.numPlanes||Mt.numIntersection!==Pt.numIntersection)||Mt.vertexAlphas!==kt||Mt.vertexTangents!==Ht||Mt.morphTargets!==Lt||Mt.morphNormals!==he||Mt.morphColors!==ke||Mt.toneMapping!==Ue||Mt.morphTargetsCount!==hn||!!Mt.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(ie=!0):(ie=!0,Mt.__version=G.version);let Zn=Mt.currentProgram;ie===!0&&(Zn=eo(G,U,H),O&&G.isNodeMaterial&&O.onUpdateProgram(G,Zn,Mt));let vi=!1,ts=!1,nr=!1;const pe=Zn.getUniforms(),ze=Mt.uniforms;if(g.useProgram(Zn.program)&&(vi=!0,ts=!0,nr=!0),G.id!==st&&(st=G.id,ts=!0),Mt.needsLights){const ge=Gg(b.state.lightProbeGridArray,H);Mt.lightProbeGrid!==ge&&(Mt.lightProbeGrid=ge,ts=!0)}if(vi||pt!==x){g.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),pe.setValue(I,"projectionMatrix",x.projectionMatrix),pe.setValue(I,"viewMatrix",x.matrixWorldInverse);const ns=pe.map.cameraPosition;ns!==void 0&&ns.setValue(I,xe.setFromMatrixPosition(x.matrixWorld)),T.logarithmicDepthBuffer&&pe.setValue(I,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&pe.setValue(I,"isOrthographic",x.isOrthographicCamera===!0),pt!==x&&(pt=x,ts=!0,nr=!0)}if(Mt.needsLights&&(In.state.directionalShadowMap.length>0&&pe.setValue(I,"directionalShadowMap",In.state.directionalShadowMap,q),In.state.spotShadowMap.length>0&&pe.setValue(I,"spotShadowMap",In.state.spotShadowMap,q),In.state.pointShadowMap.length>0&&pe.setValue(I,"pointShadowMap",In.state.pointShadowMap,q)),H.isSkinnedMesh){pe.setOptional(I,H,"bindMatrix"),pe.setOptional(I,H,"bindMatrixInverse");const ge=H.skeleton;ge&&(ge.boneTexture===null&&ge.computeBoneTexture(),pe.setValue(I,"boneTexture",ge.boneTexture,q))}H.isBatchedMesh&&(pe.setOptional(I,H,"batchingTexture"),pe.setValue(I,"batchingTexture",H._matricesTexture,q),pe.setOptional(I,H,"batchingIdTexture"),pe.setValue(I,"batchingIdTexture",H._indirectTexture,q),pe.setOptional(I,H,"batchingColorTexture"),H._colorsTexture!==null&&pe.setValue(I,"batchingColorTexture",H._colorsTexture,q));const es=W.morphAttributes;if((es.position!==void 0||es.normal!==void 0||es.color!==void 0)&&R.update(H,W,Zn),(ts||Mt.receiveShadow!==H.receiveShadow)&&(Mt.receiveShadow=H.receiveShadow,pe.setValue(I,"receiveShadow",H.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&U.environment!==null&&(ze.envMapIntensity.value=U.environmentIntensity),ze.dfgLUT!==void 0&&(ze.dfgLUT.value=EM()),ts){if(pe.setValue(I,"toneMappingExposure",D.toneMappingExposure),Mt.needsLights&&Hg(ze,nr),vt&&G.fog===!0&&bt.refreshFogUniforms(ze,vt),bt.refreshMaterialUniforms(ze,G,rt,ht,b.state.transmissionRenderTarget[x.id]),Mt.needsLights&&Mt.lightProbeGrid){const ge=Mt.lightProbeGrid;ze.probesSH.value=ge.texture,ze.probesMin.value.copy(ge.boundingBox.min),ze.probesMax.value.copy(ge.boundingBox.max),ze.probesResolution.value.copy(ge.resolution)}$o.upload(I,Ef(Mt),ze,q)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&($o.upload(I,Ef(Mt),ze,q),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&pe.setValue(I,"center",H.center),pe.setValue(I,"modelViewMatrix",H.modelViewMatrix),pe.setValue(I,"normalMatrix",H.normalMatrix),pe.setValue(I,"modelMatrix",H.matrixWorld),G.uniformsGroups!==void 0){const ge=G.uniformsGroups;for(let ns=0,ir=ge.length;ns<ir;ns++){const Tf=ge[ns];Y.update(Tf,Zn),Y.bind(Tf,Zn)}}return Zn}function Hg(x,U){x.ambientLightColor.needsUpdate=U,x.lightProbe.needsUpdate=U,x.directionalLights.needsUpdate=U,x.directionalLightShadows.needsUpdate=U,x.pointLights.needsUpdate=U,x.pointLightShadows.needsUpdate=U,x.spotLights.needsUpdate=U,x.spotLightShadows.needsUpdate=U,x.rectAreaLights.needsUpdate=U,x.hemisphereLights.needsUpdate=U}function Wg(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(x,U,W){const G=V.get(x);G.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),V.get(x.texture).__webglTexture=U,V.get(x.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:W,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,U){const W=V.get(x);W.__webglFramebuffer=U,W.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(x,U=0,W=0){nt=x,Z=U,z=W;let G=null,H=!1,vt=!1;if(x){const _t=V.get(x);if(_t.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(I.FRAMEBUFFER,_t.__webglFramebuffer),gt.copy(x.viewport),xt.copy(x.scissor),Zt=x.scissorTest,g.viewport(gt),g.scissor(xt),g.setScissorTest(Zt),st=-1;return}else if(_t.__webglFramebuffer===void 0)q.setupRenderTarget(x);else if(_t.__hasExternalTextures)q.rebindTextures(x,V.get(x.texture).__webglTexture,V.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const kt=x.depthTexture;if(_t.__boundDepthTexture!==kt){if(kt!==null&&V.has(kt)&&(x.width!==kt.image.width||x.height!==kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(x)}}const Tt=x.texture;(Tt.isData3DTexture||Tt.isDataArrayTexture||Tt.isCompressedArrayTexture)&&(vt=!0);const Rt=V.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Rt[U])?G=Rt[U][W]:G=Rt[U],H=!0):x.samples>0&&q.useMultisampledRTT(x)===!1?G=V.get(x).__webglMultisampledFramebuffer:Array.isArray(Rt)?G=Rt[W]:G=Rt,gt.copy(x.viewport),xt.copy(x.scissor),Zt=x.scissorTest}else gt.copy(It).multiplyScalar(rt).floor(),xt.copy(ve).multiplyScalar(rt).floor(),Zt=Vt;if(W!==0&&(G=j),g.bindFramebuffer(I.FRAMEBUFFER,G)&&g.drawBuffers(x,G),g.viewport(gt),g.scissor(xt),g.setScissorTest(Zt),H){const _t=V.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,_t.__webglTexture,W)}else if(vt){const _t=U;for(let Tt=0;Tt<x.textures.length;Tt++){const Rt=V.get(x.textures[Tt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Tt,Rt.__webglTexture,W,_t)}}else if(x!==null&&W!==0){const _t=V.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,_t.__webglTexture,W)}st=-1},this.readRenderTargetPixels=function(x,U,W,G,H,vt,St,_t=0){if(!(x&&x.isWebGLRenderTarget)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=V.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&St!==void 0&&(Tt=Tt[St]),Tt){g.bindFramebuffer(I.FRAMEBUFFER,Tt);try{const Rt=x.textures[_t],kt=Rt.format,Ht=Rt.type;if(x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+_t),!T.textureFormatReadable(kt)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!T.textureTypeReadable(Ht)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=x.width-G&&W>=0&&W<=x.height-H&&I.readPixels(U,W,G,H,$.convert(kt),$.convert(Ht),vt)}finally{const Rt=nt!==null?V.get(nt).__webglFramebuffer:null;g.bindFramebuffer(I.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(x,U,W,G,H,vt,St,_t=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=V.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&St!==void 0&&(Tt=Tt[St]),Tt)if(U>=0&&U<=x.width-G&&W>=0&&W<=x.height-H){g.bindFramebuffer(I.FRAMEBUFFER,Tt);const Rt=x.textures[_t],kt=Rt.format,Ht=Rt.type;if(x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+_t),!T.textureFormatReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!T.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Lt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Lt),I.bufferData(I.PIXEL_PACK_BUFFER,vt.byteLength,I.STREAM_READ),I.readPixels(U,W,G,H,$.convert(kt),$.convert(Ht),0);const he=nt!==null?V.get(nt).__webglFramebuffer:null;g.bindFramebuffer(I.FRAMEBUFFER,he);const ke=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await w_(I,ke,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Lt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,vt),I.deleteBuffer(Lt),I.deleteSync(ke),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,U=null,W=0){const G=Math.pow(2,-W),H=Math.floor(x.image.width*G),vt=Math.floor(x.image.height*G),St=U!==null?U.x:0,_t=U!==null?U.y:0;q.setTexture2D(x,0),I.copyTexSubImage2D(I.TEXTURE_2D,W,0,0,St,_t,H,vt),g.unbindTexture()},this.copyTextureToTexture=function(x,U,W=null,G=null,H=0,vt=0){let St,_t,Tt,Rt,kt,Ht,Lt,he,ke;const Ue=x.isCompressedTexture?x.mipmaps[vt]:x.image;if(W!==null)St=W.max.x-W.min.x,_t=W.max.y-W.min.y,Tt=W.isBox3?W.max.z-W.min.z:1,Rt=W.min.x,kt=W.min.y,Ht=W.isBox3?W.min.z:0;else{const ze=Math.pow(2,-H);St=Math.floor(Ue.width*ze),_t=Math.floor(Ue.height*ze),x.isDataArrayTexture?Tt=Ue.depth:x.isData3DTexture?Tt=Math.floor(Ue.depth*ze):Tt=1,Rt=0,kt=0,Ht=0}G!==null?(Lt=G.x,he=G.y,ke=G.z):(Lt=0,he=0,ke=0);const de=$.convert(U.format),hn=$.convert(U.type);let Mt;U.isData3DTexture?(q.setTexture3D(U,0),Mt=I.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(q.setTexture2DArray(U,0),Mt=I.TEXTURE_2D_ARRAY):(q.setTexture2D(U,0),Mt=I.TEXTURE_2D),g.activeTexture(I.TEXTURE0),g.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,U.flipY),g.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),g.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);const In=g.getParameter(I.UNPACK_ROW_LENGTH),ie=g.getParameter(I.UNPACK_IMAGE_HEIGHT),Zn=g.getParameter(I.UNPACK_SKIP_PIXELS),vi=g.getParameter(I.UNPACK_SKIP_ROWS),ts=g.getParameter(I.UNPACK_SKIP_IMAGES);g.pixelStorei(I.UNPACK_ROW_LENGTH,Ue.width),g.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ue.height),g.pixelStorei(I.UNPACK_SKIP_PIXELS,Rt),g.pixelStorei(I.UNPACK_SKIP_ROWS,kt),g.pixelStorei(I.UNPACK_SKIP_IMAGES,Ht);const nr=x.isDataArrayTexture||x.isData3DTexture,pe=U.isDataArrayTexture||U.isData3DTexture;if(x.isDepthTexture){const ze=V.get(x),es=V.get(U),ge=V.get(ze.__renderTarget),ns=V.get(es.__renderTarget);g.bindFramebuffer(I.READ_FRAMEBUFFER,ge.__webglFramebuffer),g.bindFramebuffer(I.DRAW_FRAMEBUFFER,ns.__webglFramebuffer);for(let ir=0;ir<Tt;ir++)nr&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,V.get(x).__webglTexture,H,Ht+ir),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,V.get(U).__webglTexture,vt,ke+ir)),I.blitFramebuffer(Rt,kt,St,_t,Lt,he,St,_t,I.DEPTH_BUFFER_BIT,I.NEAREST);g.bindFramebuffer(I.READ_FRAMEBUFFER,null),g.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(H!==0||x.isRenderTargetTexture||V.has(x)){const ze=V.get(x),es=V.get(U);g.bindFramebuffer(I.READ_FRAMEBUFFER,et),g.bindFramebuffer(I.DRAW_FRAMEBUFFER,k);for(let ge=0;ge<Tt;ge++)nr?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ze.__webglTexture,H,Ht+ge):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ze.__webglTexture,H),pe?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,es.__webglTexture,vt,ke+ge):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,es.__webglTexture,vt),H!==0?I.blitFramebuffer(Rt,kt,St,_t,Lt,he,St,_t,I.COLOR_BUFFER_BIT,I.NEAREST):pe?I.copyTexSubImage3D(Mt,vt,Lt,he,ke+ge,Rt,kt,St,_t):I.copyTexSubImage2D(Mt,vt,Lt,he,Rt,kt,St,_t);g.bindFramebuffer(I.READ_FRAMEBUFFER,null),g.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else pe?x.isDataTexture||x.isData3DTexture?I.texSubImage3D(Mt,vt,Lt,he,ke,St,_t,Tt,de,hn,Ue.data):U.isCompressedArrayTexture?I.compressedTexSubImage3D(Mt,vt,Lt,he,ke,St,_t,Tt,de,Ue.data):I.texSubImage3D(Mt,vt,Lt,he,ke,St,_t,Tt,de,hn,Ue):x.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,vt,Lt,he,St,_t,de,hn,Ue.data):x.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,vt,Lt,he,Ue.width,Ue.height,de,Ue.data):I.texSubImage2D(I.TEXTURE_2D,vt,Lt,he,St,_t,de,hn,Ue);g.pixelStorei(I.UNPACK_ROW_LENGTH,In),g.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ie),g.pixelStorei(I.UNPACK_SKIP_PIXELS,Zn),g.pixelStorei(I.UNPACK_SKIP_ROWS,vi),g.pixelStorei(I.UNPACK_SKIP_IMAGES,ts),vt===0&&U.generateMipmaps&&I.generateMipmap(Mt),g.unbindTexture()},this.initRenderTarget=function(x){V.get(x).__webglFramebuffer===void 0&&q.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?q.setTextureCube(x,0):x.isData3DTexture?q.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?q.setTexture2DArray(x,0):q.setTexture2D(x,0),g.unbindTexture()},this.resetState=function(){Z=0,z=0,nt=null,g.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Kt._getUnpackColorSpace()}}const Ld={type:"change"},xu={type:"start"},Pm={type:"end"},No=new Sl,Dd=new us,TM=Math.cos(70*Rh.DEG2RAD),Ke=new P,Tn=2*Math.PI,ue={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Pc=1e-6;class AM extends R1{constructor(t,n=null){super(t,n),this.state=ue.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Rr.ROTATE,MIDDLE:Rr.DOLLY,RIGHT:Rr.PAN},this.touches={ONE:Ar.ROTATE,TWO:Ar.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new vs,this._lastTargetPosition=new P,this._quat=new vs().setFromUnitVectors(t.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ph,this._sphericalDelta=new Ph,this._scale=1,this._panOffset=new P,this._rotateStart=new yt,this._rotateEnd=new yt,this._rotateDelta=new yt,this._panStart=new yt,this._panEnd=new yt,this._panDelta=new yt,this._dollyStart=new yt,this._dollyEnd=new yt,this._dollyDelta=new yt,this._dollyDirection=new P,this._mouse=new yt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=RM.bind(this),this._onPointerDown=wM.bind(this),this._onPointerUp=CM.bind(this),this._onContextMenu=FM.bind(this),this._onMouseWheel=DM.bind(this),this._onKeyDown=IM.bind(this),this._onTouchStart=UM.bind(this),this._onTouchMove=NM.bind(this),this._onMouseDown=PM.bind(this),this._onMouseMove=LM.bind(this),this._interceptControlDown=OM.bind(this),this._interceptControlUp=BM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ld),this.update(),this.state=ue.NONE}pan(t,n){this._pan(t,n),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const n=this.object.position;Ke.copy(n).sub(this.target),Ke.applyQuaternion(this._quat),this._spherical.setFromVector3(Ke),this.autoRotate&&this.state===ue.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Tn:i>Math.PI&&(i-=Tn),s<-Math.PI?s+=Tn:s>Math.PI&&(s-=Tn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ke.setFromSpherical(this._spherical),Ke.applyQuaternion(this._quatInverse),n.copy(this.target).add(Ke),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ke.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new P(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new P(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ke.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(No.origin.copy(this.object.position),No.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(No.direction))<TM?this.object.lookAt(this.target):(Dd.setFromNormalAndCoplanarPoint(this.object.up,this.target),No.intersectPlane(Dd,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Pc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Pc||this._lastTargetPosition.distanceToSquared(this.target)>Pc?(this.dispatchEvent(Ld),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Tn/60*this.autoRotateSpeed*t:Tn/60/60*this.autoRotateSpeed}_getZoomScale(t){const n=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,n){Ke.setFromMatrixColumn(n,0),Ke.multiplyScalar(-t),this._panOffset.add(Ke)}_panUp(t,n){this.screenSpacePanning===!0?Ke.setFromMatrixColumn(n,1):(Ke.setFromMatrixColumn(n,0),Ke.crossVectors(this.object.up,Ke)),Ke.multiplyScalar(t),this._panOffset.add(Ke)}_pan(t,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ke.copy(s).sub(this.target);let r=Ke.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*n*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=n-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Tn*this._rotateDelta.x/n.clientHeight),this._rotateUp(Tn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let n=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const n=this._getSecondPointerPosition(t),i=t.pageX-n.x,s=t.pageY-n.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Tn*this._rotateDelta.x/n.clientHeight),this._rotateUp(Tn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const n=this._getSecondPointerPosition(t),i=t.pageX-n.x,s=t.pageY-n.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+n.x)*.5,o=(t.pageY+n.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(t){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId)return!0;return!1}_trackPointer(t){let n=this._pointerPositions[t.pointerId];n===void 0&&(n=new yt,this._pointerPositions[t.pointerId]=n),n.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const n=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(t){const n=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function wM(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function RM(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function CM(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Pm),this.state=ue.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function PM(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Rr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=ue.DOLLY;break;case Rr.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ue.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ue.ROTATE}break;case Rr.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ue.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ue.PAN}break;default:this.state=ue.NONE}this.state!==ue.NONE&&this.dispatchEvent(xu)}function LM(e){switch(this.state){case ue.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case ue.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case ue.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function DM(e){this.enabled===!1||this.enableZoom===!1||this.state!==ue.NONE||(e.preventDefault(),this.dispatchEvent(xu),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Pm))}function IM(e){this.enabled!==!1&&this._handleKeyDown(e)}function UM(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Ar.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=ue.TOUCH_ROTATE;break;case Ar.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=ue.TOUCH_PAN;break;default:this.state=ue.NONE}break;case 2:switch(this.touches.TWO){case Ar.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=ue.TOUCH_DOLLY_PAN;break;case Ar.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=ue.TOUCH_DOLLY_ROTATE;break;default:this.state=ue.NONE}break;default:this.state=ue.NONE}this.state!==ue.NONE&&this.dispatchEvent(xu)}function NM(e){switch(this._trackPointer(e),this.state){case ue.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case ue.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case ue.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case ue.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=ue.NONE}}function FM(e){this.enabled!==!1&&e.preventDefault()}function OM(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function BM(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Jo={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ya{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const kM=new vu(-1,1,1,-1,0,1);class zM extends ae{constructor(){super(),this.setAttribute("position",new ee([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ee([0,2,0,0,2,0],2))}}const GM=new zM;class Lm{constructor(t){this._mesh=new pn(GM,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,kM)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Dm extends Ya{constructor(t,n="tDiffuse"){super(),this.textureID=n,this.uniforms=null,this.material=null,t instanceof mn?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ul.clone(t.uniforms),this.material=new mn({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Lm(this.material)}render(t,n,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Id extends Ya{constructor(t,n){super(),this.scene=t,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,n,i){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class VM extends Ya{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class HM{constructor(t,n){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),n===void 0){const i=t.getSize(new yt);this._width=i.width,this._height=i.height,n=new Ln(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:zn}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Dm(Jo),this.copyPass.material.blending=Ri,this.timer=new T1}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,n){this.passes.splice(n,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const n=this.passes.indexOf(t);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(t){for(let n=t+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const n=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Id!==void 0&&(a instanceof Id?i=!0:a instanceof VM&&(i=!1))}}this.renderer.setRenderTarget(n)}reset(t){if(t===void 0){const n=this.renderer.getSize(new yt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,n){this._width=t,this._height=n;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class WM extends Ya{constructor(t,n,i=null,s=null,r=null){super(),this.scene=t,this.camera=n,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Wt}render(t,n,i){const s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}}const XM={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Wt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class kr extends Ya{constructor(t,n=1,i,s){super(),this.strength=n,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new yt(t.x,t.y):new yt(256,256),this.clearColor=new Wt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Ln(r,a,{type:zn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new Ln(r,a,{type:zn});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const h=new Ln(r,a,{type:zn});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),a=Math.round(a/2)}const o=XM;this.highPassUniforms=ul.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new mn({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new yt(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ul.clone(Jo.uniforms),this.blendMaterial=new mn({uniforms:this.copyUniforms,vertexShader:Jo.vertexShader,fragmentShader:Jo.fragmentShader,premultipliedAlpha:!0,blending:Rn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Wt,this._oldClearAlpha=1,this._basic=new Yi,this._fsQuad=new Lm(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,n){let i=Math.round(t/2),s=Math.round(n/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new yt(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,n,i,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=kr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=kr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){const n=[],i=t/3;for(let s=0;s<t;s++)n.push(.39894*Math.exp(-.5*s*s/(i*i))/i);return new mn({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new yt(.5,.5)},direction:{value:new yt(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new mn({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}kr.BlurDirectionX=new yt(1,0);kr.BlurDirectionY=new yt(0,1);function yr(e,t=1){return new uu({color:e,transparent:!0,opacity:t,blending:Rn,depthWrite:!1})}function YM(e,t){const n=new Cn,i=new Cn,s=new Cn;if(e==="nexus"){const r=new Hi(2.05,1),a=new Us(r),o=new Is(a,yr(t.mid,.5));n.add(o);for(let _=0;_<24;_++){const S=Math.acos(2*Math.random()-1),m=Math.random()*Math.PI*2,d=new yl(.045,6),y=new Us(d),E=new Is(y,yr(Math.random()>.5?t.bright:t.dim,.4));E.position.setFromSphericalCoords(2.06,S,m),E.lookAt(0,0,0),n.add(E)}const l=new gu(1.55,.008,6,64,Math.PI*1.2);for(let _=0;_<5;_++){const S=new pn(l,new Yi({color:_%2?t.bright:t.dim,transparent:!0,opacity:.5,blending:Rn}));S.rotation.x=Math.random()*Math.PI,S.rotation.y=Math.random()*Math.PI*2,n.add(S)}const c=new du(.55,0),u=new Us(c),f=new Is(u,yr(t.hot,.9));i.add(f);const p=new Hi(2.05,1).attributes.position;for(let _=0;_<p.count;_+=5){const S=new P().fromBufferAttribute(p,_).normalize().multiplyScalar(2.05),m=[new P(0,0,0),S];i.add(new wn(new ae().setFromPoints(m),yr(t.dim,.25)))}}if(e==="aegis"){const r=new _u(1.35,.35,96,12,2,3),a=new Us(r,30),o=new Is(a,yr(t.mid,.55));n.add(o);const l=new Ba(1.1,1),c=new Us(l),u=new Is(c,yr(t.bright,.7));n.add(u);const f=new Ba(.05,0);for(let d=0;d<40;d++){const y=new pn(f,new Yi({color:d%3===0?t.hot:t.mid,transparent:!0,opacity:.8,blending:Rn})),E=d/40*Math.PI*2;y.position.set(Math.cos(E)*2.2,(Math.random()-.5)*.6,Math.sin(E)*2.2),s.add(y)}const h=600,p=new Float32Array(h*3);for(let d=0;d<h;d++){const y=.7*Math.random(),E=Math.random()*Math.PI*2,M=Math.acos(2*Math.random()-1);p[d*3]=y*Math.sin(M)*Math.cos(E),p[d*3+1]=y*Math.cos(M),p[d*3+2]=y*Math.sin(M)*Math.sin(E)}const _=new ae;_.setAttribute("position",new ee(p,3));const S=new fu({color:t.bright,size:.03,transparent:!0,opacity:.9,blending:Rn,depthWrite:!1,sizeAttenuation:!0}),m=new _m(_,S);i.add(m)}return{shell:n,core:i,ambient:s}}const Ud=new P(0,.5,5.5),Nd=.6,Fd=40;function qM(e){const t=parseInt(e.replace("#",""),16),{h:n,s:i,l:s}=KM(t),r=(a,o=i,l=n)=>ZM(l,o,a);return{bright:r(Math.min(.95,s+.28)),mid:t,dim:r(Math.max(.05,s-.16)),faint:r(Math.max(.03,s-.26)),hot:r(.96,Math.max(.15,i-.35))}}function KM(e){let t=e>>16&255,n=e>>8&255,i=e&255;Number.isNaN(t)&&(t=255,n=170,i=48),t/=255,n/=255,i/=255;const s=Math.max(t,n,i),r=Math.min(t,n,i),a=(s+r)/2;let o=0,l=0;if(s!==r){const c=s-r;switch(l=a>.5?c/(2-s-r):c/(s+r),s){case t:o=(n-i)/c+(n<i?6:0);break;case n:o=(i-t)/c+2;break;default:o=(t-n)/c+4;break}o/=6}return{h:o,s:l,l:a}}function ZM(e,t,n){const i=(c,u,f)=>(f<0&&(f+=1),f>1&&(f-=1),f<.16666666666666666?c+(u-c)*6*f:f<.5?u:f<.6666666666666666?c+(u-c)*(.6666666666666666-f)*6:c);if(t===0){const c=Math.round(n*255);return c<<16|c<<8|c}const s=n<.5?n*(1+t):n+t-n*t,r=2*n-s,a=i(r,s,e+1/3),o=i(r,s,e),l=i(r,s,e-1/3);return Math.round(a*255)<<16|Math.round(o*255)<<8|Math.round(l*255)}function $M(e,t,n){const i=e.clientWidth,s=e.clientHeight,r=new s1,a=new ei(55,i/s,.1,500);a.position.copy(Ud);const o=new bM({antialias:!0});o.setSize(i,s),o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.toneMapping=tu,o.toneMappingExposure=.8,e.appendChild(o.domElement);const l=new HM(o);l.addPass(new WM(r,a));const c=new kr(new yt(i,s),(n==null?void 0:n.bloomStrength)??1.8,.4,.2);l.addPass(c);const u=new Dm({uniforms:{tDiffuse:{value:null},uTime:{value:0},uIntensity:{value:(n==null?void 0:n.aberration)??.003},uTint:{value:new Wt(t.mid)}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform sampler2D tDiffuse;
      uniform float uTime;
      uniform float uIntensity;
      uniform vec3 uTint;
      varying vec2 vUv;
      void main() {
        vec2 dir = vUv - vec2(0.5);
        float d = length(dir);
        float offset = uIntensity * d;
        float flicker = 1.0 + 0.02 * sin(uTime * 30.0) * sin(uTime * 7.3);
        vec4 cr = texture2D(tDiffuse, vUv + dir * offset);
        vec4 cg = texture2D(tDiffuse, vUv);
        vec4 cb = texture2D(tDiffuse, vUv - dir * offset * 0.5);
        gl_FragColor = vec4(cr.r, cg.g * 1.05, cb.b * 0.6, 1.0) * flicker;
        // Push toward the theme tint
        gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb * (uTint * 1.35), 0.3);
      }
    `});l.addPass(u);const f=new AM(a,o.domElement);f.enableDamping=!0,f.dampingFactor=.04,f.minDistance=Nd,f.maxDistance=Fd,f.zoomSpeed=1.4,f.enablePan=!1,f.enabled=!1;let h=t;function p(B){const tt=new Map;for(const R of Object.keys(h))tt.set(h[R],B[R]);r.traverse(R=>{const X=R.material;if(!(X!=null&&X.color))return;const N=X.color.getHex(),$=tt.get(N);$!==void 0&&X.color.setHex($)}),h=B,u.uniforms.uTint.value=new Wt(B.mid),c.strength=c.strength}const _=new Cn;r.add(_);const S=(n==null?void 0:n.variant)??"ultron",{shell:m,core:d,ambient:y}=YM(S,t);_.add(m,d,y);function E(B,tt=1){return new uu({color:B,transparent:!0,opacity:tt,blending:Rn,depthWrite:!1})}function M(B,tt,R=120){const X=B*Math.cos(tt),N=B*Math.sin(tt),$=[];for(let it=0;it<=R;it++){const Y=it/R*Math.PI*2;$.push(new P(X*Math.cos(Y),N,X*Math.sin(Y)))}return new ae().setFromPoints($)}function w(B,tt,R=120){const X=[];for(let N=0;N<=R;N++){const $=N/R*Math.PI-Math.PI/2;X.push(new P(B*Math.cos($)*Math.cos(tt),B*Math.sin($),B*Math.cos($)*Math.sin(tt)))}return new ae().setFromPoints(X)}const b=new Cn,C=2;for(let B=-15;B<=15;B++){const tt=B/15*(Math.PI/2)*.95,R=B%3===0?.5:.12,X=B%3===0?h.mid:h.faint;b.add(new wn(M(C,tt),E(X,R)))}for(let B=0;B<24;B++){const tt=B/24*Math.PI*2,R=B%6===0;b.add(new wn(w(C,tt),E(R?h.mid:h.faint,R?.6:.1)))}const v=18,A=.25;for(let B=0;B<4;B++){const tt=B/4*Math.PI*2;for(let R=0;R<v;R++){const X=R/(v-1)*2-1,N=X*A/2,it=.85*(1-Math.abs(X)*.7),Y=Math.abs(X)<.3?h.bright:h.mid;b.add(new wn(w(C,tt+N,200),E(Y,it)))}}const D=20,L=.35;for(let B=0;B<D;B++){const tt=B/(D-1)*2-1,R=tt*L/2,N=.8*(1-Math.abs(tt)*.65),$=Math.abs(tt)<.3?h.bright:h.mid;b.add(new wn(M(C,R,200),E($,N)))}_.add(b);const O=new Cn;function j(B,tt,R,X,N,$=4){const it=new Cn,Y=E(h.dim,.25);for(let lt=0;lt<=$;lt++){const ut=B-R/2+lt/$*R,qt=[];for(let zt=0;zt<=$*4;zt++){const we=tt-X/2+zt/($*4)*X;qt.push(new P(N*Math.cos(ut)*Math.cos(we),N*Math.sin(ut),N*Math.cos(ut)*Math.sin(we)))}it.add(new wn(new ae().setFromPoints(qt),Y))}for(let lt=0;lt<=$;lt++){const ut=tt-X/2+lt/$*X,qt=[];for(let zt=0;zt<=$*4;zt++){const we=B-R/2+zt/($*4)*R;qt.push(new P(N*Math.cos(we)*Math.cos(ut),N*Math.sin(we),N*Math.cos(we)*Math.sin(ut)))}it.add(new wn(new ae().setFromPoints(qt),Y))}return it}for(let B=0;B<30;B++){const tt=(Math.random()-.5)*Math.PI*.8,R=Math.random()*Math.PI*2,X=.15+Math.random()*.25;O.add(j(tt,R,X,X,C+.01,3+Math.floor(Math.random()*3)))}_.add(O);const et=new Cn,k=2.12;for(let B=0;B<16;B++){const tt=(Math.random()-.5)*Math.PI*.85,R=Math.random()*Math.PI*2,X=.3+Math.random()*1.2,N=[],$=60,it=k*Math.cos(tt),Y=k*Math.sin(tt);for(let lt=0;lt<=$;lt++){const ut=R+lt/$*X;N.push(new P(it*Math.cos(ut),Y,it*Math.sin(ut)))}et.add(new wn(new ae().setFromPoints(N),E(h.mid,.2+Math.random()*.3)))}for(let B=0;B<12;B++){const tt=Math.random()*Math.PI*2,R=(Math.random()-.5)*Math.PI*.8,X=.3+Math.random()*.8,N=[],$=40;for(let it=0;it<=$;it++){const Y=R+it/$*X;N.push(new P(k*Math.cos(Y)*Math.cos(tt),k*Math.sin(Y),k*Math.cos(Y)*Math.sin(tt)))}et.add(new wn(new ae().setFromPoints(N),E(h.dim,.15+Math.random()*.2)))}_.add(et);const Z=new Cn,z=.9;for(let B=0;B<8;B++){const tt=[],R=3+Math.random()*2,X=300,N=B/8*Math.PI*2;for(let $=0;$<=X;$++){const it=$/X,Y=it*Math.PI-Math.PI/2,lt=it*R*Math.PI*2+N;tt.push(new P(z*Math.cos(Y)*Math.cos(lt),z*Math.sin(Y),z*Math.cos(Y)*Math.sin(lt)))}Z.add(new wn(new ae().setFromPoints(tt),E(h.bright,.3+Math.random()*.2)))}for(let B=-6;B<=6;B++){const tt=B/6*(Math.PI/2)*.9;Z.add(new wn(M(z,tt,80),E(h.dim,.2)))}for(let B=0;B<12;B++){const tt=B/12*Math.PI*2;Z.add(new wn(w(z,tt,80),E(h.dim,.15)))}_.add(Z);const nt=.25,st=new Hi(nt,1),pt=new Us(st),gt=E(h.hot,.9),xt=new Is(pt,gt);_.add(xt);const Zt=new Yi({color:h.hot,transparent:!0,opacity:.15,blending:Rn}),_e=new pn(new hl(.15,16,16),Zt);_.add(_e);const $t=new Yi({color:h.mid,transparent:!0,opacity:.04,blending:Rn}),Q=new pn(new hl(.5,16,16),$t);_.add(Q);const ht=["sys.init()","0xFF3A","malloc()",">> SCAN","void*","ACK","SYNC OK","ptr_ref","exec()","hash256","::bind","core.0","01101001","10110100",">>> RDY","HEAP 4K","TCP/SYN","mutex.lk","IRQ 0x7","DMA xfer","REG EAX","FAULT 0","kernel.d","pipe |>","chmod +x","fork()","SIGTERM","eth0: UP","AES-256","RSA 4096","TLS 1.3","HTTP/2","latency","200 OK","PATCH /","fn main","use std","impl Orb","async {}","spawn()","arc::new",".unwrap"];function rt(B,tt=.08){const R=document.createElement("canvas");R.width=256,R.height=32;const X=R.getContext("2d");X.font="bold 14px Courier New";const N=.35+Math.random()*.55;X.fillStyle=`rgba(${h.hot>>16&255|0}, ${(h.hot>>8&255)+60|0}, ${(h.hot&255)+60|0}, ${N})`,X.textAlign="center",X.textBaseline="middle",X.fillText(B,128,16);const $=new nd(R);$.minFilter=ln;const it=new h1(new pm({map:$,transparent:!0,blending:Rn,depthWrite:!1}));return it.scale.set(tt*5,tt*.7,1),it}function Ft(B,tt,R,X){const N=new Cn;for(let $=0;$<B;$++){const it=rt(ht[Math.floor(Math.random()*ht.length)],tt()),Y=Math.acos(2*Math.random()-1),lt=Math.random()*Math.PI*2,ut=R();it.position.set(ut*Math.sin(Y)*Math.cos(lt),ut*Math.cos(Y),ut*Math.sin(Y)*Math.sin(lt)),it.userData={phi:Y,theta:lt,r:ut,speed:(X[0]+Math.random()*X[1])*(Math.random()>.5?1:-1)},N.add(it)}return N}const Ot=Ft(1200,()=>.04+Math.random()*.04,()=>C+.03+Math.random()*.08,[2e-4,8e-4]);_.add(Ot);const It=Ft(100,()=>.03+Math.random()*.03,()=>z+.02,[5e-4,.001]);_.add(It);const ve=Ft(400,()=>.03,()=>z+.2+Math.random()*(C-z-.3),[3e-4,6e-4]);_.add(ve);const Vt=[new Hi(.012,0),new Hi(.02,0),new Hi(.03,1),new Hi(.008,0),new mu(.015,0),new Ba(.018,0)],ne=[];for(let B=0;B<250;B++){const tt=Vt[Math.floor(Math.random()*Vt.length)],R=new Yi({color:Math.random()>.7?h.bright:h.mid,transparent:!0,opacity:.3+Math.random()*.6,blending:Rn}),X=new pn(tt,R),N=1.2+Math.random()*4,$=(.08+Math.random()*.6)*(Math.random()>.5?1:-1),it=(Math.random()-.5)*Math.PI*.9,Y=(Math.random()-.5)*Math.PI*.5,lt=Math.random()*Math.PI*2;if(X.userData={orbitR:N,speed:$,tiltX:it,tiltZ:Y,phase:lt},ne.push(X),_.add(X),Math.random()>.85){const ut=[];for(let zt=0;zt<=15;zt++){const we=-(zt/15)*.3;ut.push(new P(N*Math.cos(we+lt),N*.08*Math.sin(we*3),N*Math.sin(we+lt)))}const qt=new wn(new ae().setFromPoints(ut),E(h.faint,.08));X.add(qt)}}const Jt=2e3,Xt=new Float32Array(Jt*3);for(let B=0;B<Jt;B++){const tt=.5+Math.pow(Math.random(),.6)*7,R=Math.random()*Math.PI*2,X=Math.acos(2*Math.random()-1);Xt[B*3]=tt*Math.sin(X)*Math.cos(R),Xt[B*3+1]=tt*Math.cos(X),Xt[B*3+2]=tt*Math.sin(X)*Math.sin(R)}const Te=new ae;Te.setAttribute("position",new ee(Xt,3));const xe=document.createElement("canvas");xe.width=xe.height=64;const Ie=xe.getContext("2d"),Ae=Ie.createRadialGradient(32,32,0,32,32,32);Ae.addColorStop(0,"rgba(255,170,48,1)"),Ae.addColorStop(.2,"rgba(255,120,20,0.6)"),Ae.addColorStop(.5,"rgba(200,80,0,0.15)"),Ae.addColorStop(1,"rgba(100,40,0,0)"),Ie.fillStyle=Ae,Ie.fillRect(0,0,64,64);const Me=new fu({map:new nd(xe),size:.04,transparent:!0,opacity:.5,blending:Rn,depthWrite:!1,sizeAttenuation:!0,color:h.bright}),Se=new _m(Te,Me);_.add(Se);function I(B,tt=.015){const R=new pu(B-tt,B+tt,120),X=new Yi({color:h.bright,transparent:!0,opacity:0,blending:Rn,side:bi,depthWrite:!1}),N=new pn(R,X);return N.rotation.x=Math.PI/2,N}const qe=I(C,.01),jt=I(C*.7,.008);_.add(qe,jt);for(let B=0;B<15;B++){const tt=Math.acos(2*Math.random()-1),R=Math.random()*Math.PI*2,X=C+.02,N=new yl(.03+Math.random()*.02,6),$=new Us(N),it=new Is($,E(h.mid,.5));it.position.set(X*Math.sin(tt)*Math.cos(R),X*Math.cos(tt),X*Math.sin(tt)*Math.sin(R)),it.lookAt(0,0,0),b.add(it)}const T=new Ph,g=new P;function F(B,tt){g.copy(a.position).sub(f.target),T.setFromVector3(g),T.theta-=B,T.phi=Rh.clamp(T.phi-tt,.05,Math.PI-.05),T.makeSafe(),g.setFromSpherical(T),a.position.copy(f.target).add(g),a.lookAt(f.target)}function V(B){g.copy(a.position).sub(f.target);const tt=Rh.clamp(g.length()*B,Nd,Fd);g.setLength(tt),a.position.copy(f.target).add(g)}function q(){a.position.copy(Ud),f.target.set(0,0,0),a.lookAt(f.target),f.update()}const ot=new w1;let ct=0,K=0,J=!1;function ft(){var pa,ma,gi;if(J)return;K=requestAnimationFrame(ft);const B=ot.getElapsedTime(),tt=Math.max(0,Math.min(1.5,at.energy??.5)),R=Math.max(0,Math.min(1.5,at.amplitude??0)),X=at.state==="error"?.5:at.state==="working"||at.state==="thinking"||at.state==="listening"||at.state==="speaking"||at.state==="executing"||at.state==="updating"?1:at.state==="alert"?.8:.3,N=1+tt*.5+X*.4;b.rotation.y+=.0015*(((pa=n==null?void 0:n.spin)==null?void 0:pa[0])??1)*N,b.rotation.x=Math.sin(B*.08)*.05,O.rotation.y+=.0018*(((ma=n==null?void 0:n.spin)==null?void 0:ma[0])??1)*N,O.rotation.x=Math.sin(B*.08+.5)*.04,et.rotation.y-=.001*(((gi=n==null?void 0:n.spin)==null?void 0:gi[1])??1.6)*N,et.rotation.z=Math.sin(B*.12)*.03,Z.rotation.y-=.005*N,Z.rotation.z+=.002,Z.rotation.x=Math.cos(B*.1)*.08,xt.rotation.x+=.008*N,xt.rotation.y+=.012*N,S==="nexus"&&(m.rotation.y+=8e-4,m.rotation.z=Math.sin(B*.05)*.02,d.rotation.y-=.006,d.rotation.x=Math.sin(B*.03)*.04,m.children.forEach(Be=>{const _i=Be.geometry;(_i==null?void 0:_i.type)==="TorusGeometry"&&(Be.rotation.x+=.002,Be.rotation.z+=.0015)})),S==="aegis"&&(m.rotation.y+=.0012,m.rotation.x=Math.cos(B*.07)*.02,d.rotation.y+=.004,d.rotation.z=Math.sin(B*.04)*.03,y.rotation.y-=8e-4,y.children.forEach(Be=>{Be.rotation.y+=.01,Be.rotation.x+=.005}));const $=Math.sin(B*1.2),it=Math.pow(Math.max(0,Math.sin(B*.4)),5),Y=Math.pow(Math.max(0,Math.sin(B*.7+2)),8),lt=Math.pow(Math.max(0,Math.sin(B*.25)),3),ut=((n==null?void 0:n.surge)??1)*(.6+tt*.8),qt=(it*1.5+Y*2)*ut+R*.5,zt=1+qt+Math.sin(B*5)*(.05+R*.1)+Math.sin(B*11)*R*.06;_e.scale.setScalar(zt);const we=Math.max(0,(.08+$*.05+qt*.2)*(1-lt*.95));Zt.opacity=Math.min(.6,we*((n==null?void 0:n.coreBrightness)??1)),Q.scale.setScalar(1+qt*.8),$t.opacity=Math.max(0,(.03+qt*.08)*(1-lt*.9))*((n==null?void 0:n.coreBrightness)??1),xt.scale.setScalar(1+qt*.6),gt.opacity=Math.min(1,.5+qt*.4);const Kn=Math.max(1,Math.min(ne.length,Math.round((at.satellites??0)/Math.max(1,ne.length)*ne.length)+1));Se.rotation.y+=4e-4*N,ne.forEach((Be,_i)=>{Be.visible=_i<Kn;const Sn=Be.userData,Ve=B*Sn.speed*(1+R*.4)+Sn.phase;Be.position.set(Sn.orbitR*Math.cos(Ve)*Math.cos(Sn.tiltX),Sn.orbitR*Math.sin(Sn.tiltX)*Math.sin(Ve*.8)+Math.sin(Ve*.3+Sn.tiltZ)*.2,Sn.orbitR*Math.sin(Ve)*Math.cos(Sn.tiltZ)),Be.rotation.x+=.015,Be.rotation.z+=.01});const Zl=[[Ot,1],[It,2],[ve,1.2]];for(const[Be,_i]of Zl)Be.children.forEach(Sn=>{const Ve=Sn.userData;Ve.theta+=Ve.speed*_i,Sn.position.set(Ve.r*Math.sin(Ve.phi)*Math.cos(Ve.theta),Ve.r*Math.cos(Ve.phi),Ve.r*Math.sin(Ve.phi)*Math.sin(Ve.theta))});const fa=Math.sin(B*.4)*C;qe.position.y=fa;const er=Math.sqrt(Math.max(0,C*C-fa*fa))/C;qe.scale.set(er,er,1),qe.material.opacity=.2*er;const Es=Math.sin(B*.6+2)*z;jt.position.y=Es;const da=Math.sqrt(Math.max(0,z*z-Es*Es))/z;jt.scale.set(da,da,1),jt.material.opacity=.15*da,Se.rotation.y+=2e-4,ct+=.016,ct>.1&&(ct=0,O.children.forEach(Be=>{Math.random()>.95&&(Be.visible=!Be.visible)})),c.strength=((n==null?void 0:n.bloomStrength)??1.8)+Math.sin(B*.8)*.3+tt*.4+R*.3,u.uniforms.uTime.value=B,f.update(),l.render()}ft();function bt(){const B=e.clientWidth,tt=e.clientHeight;a.aspect=B/tt,a.updateProjectionMatrix(),o.setSize(B,tt),l.setSize(B,tt)}window.addEventListener("resize",bt);const at={energy:.5,amplitude:0,satellites:0,state:"idle"};function dt(B){B.energy!==void 0&&(at.energy=B.energy),B.amplitude!==void 0&&(at.amplitude=B.amplitude),B.satellites!==void 0&&(at.satellites=B.satellites),B.state!==void 0&&(at.state=B.state)}function Pt(){J=!0,cancelAnimationFrame(K),window.removeEventListener("resize",bt),f.dispose(),r.traverse(B=>{var X;const tt=B;tt.geometry&&tt.geometry.dispose();const R=Array.isArray(tt.material)?tt.material:[tt.material];for(const N of R){if(!N)continue;(X=N.map)==null||X.dispose(),N.dispose()}}),l.dispose(),o.dispose(),o.domElement.remove()}return{applyPalette:p,setFeed:dt,rotateBy:F,zoomBy:V,zoomIn:()=>V(.65),zoomOut:()=>V(1.55),resetView:q,dispose:Pt}}var zr=typeof self<"u"?self:{};function Im(e,t){t:{for(var n=["CLOSURE_FLAGS"],i=zr,s=0;s<n.length;s++)if((i=i[n[s]])==null){n=null;break t}n=i}return(e=n&&n[e])!=null?e:t}function Rs(){throw Error("Invalid UTF8")}function Od(e,t){return t=String.fromCharCode.apply(null,t),e==null?t:e+t}let Fo,Lc;const JM=typeof TextDecoder<"u";let jM;const QM=typeof TextEncoder<"u";function Um(e){if(QM)e=(jM||(jM=new TextEncoder)).encode(e);else{let n=0;const i=new Uint8Array(3*e.length);for(let s=0;s<e.length;s++){var t=e.charCodeAt(s);if(t<128)i[n++]=t;else{if(t<2048)i[n++]=t>>6|192;else{if(t>=55296&&t<=57343){if(t<=56319&&s<e.length){const r=e.charCodeAt(++s);if(r>=56320&&r<=57343){t=1024*(t-55296)+r-56320+65536,i[n++]=t>>18|240,i[n++]=t>>12&63|128,i[n++]=t>>6&63|128,i[n++]=63&t|128;continue}s--}t=65533}i[n++]=t>>12|224,i[n++]=t>>6&63|128}i[n++]=63&t|128}}e=n===i.length?i:i.subarray(0,n)}return e}function Nm(e){zr.setTimeout(()=>{throw e},0)}var Ih,tS=Im(610401301,!1),Bd=Im(748402147,!0);function kd(){var e=zr.navigator;return e&&(e=e.userAgent)?e:""}const zd=zr.navigator;function Al(e){return Al[" "](e),e}Ih=zd&&zd.userAgentData||null,Al[" "]=function(){};const Fm={};let Ca=null;function eS(e){const t=e.length;let n=3*t/4;n%3?n=Math.floor(n):"=.".indexOf(e[t-1])!=-1&&(n="=.".indexOf(e[t-2])!=-1?n-2:n-1);const i=new Uint8Array(n);let s=0;return function(r,a){function o(c){for(;l<r.length;){const u=r.charAt(l++),f=Ca[u];if(f!=null)return f;if(!/^[\s\xa0]*$/.test(u))throw Error("Unknown base64 encoding at char: "+u)}return c}Om();let l=0;for(;;){const c=o(-1),u=o(0),f=o(64),h=o(64);if(h===64&&c===-1)break;a(c<<2|u>>4),f!=64&&(a(u<<4&240|f>>2),h!=64&&a(f<<6&192|h))}}(e,function(r){i[s++]=r}),s!==n?i.subarray(0,s):i}function Om(){if(!Ca){Ca={};var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),t=["+/=","+/","-_=","-_.","-_"];for(let n=0;n<5;n++){const i=e.concat(t[n].split(""));Fm[n]=i;for(let s=0;s<i.length;s++){const r=i[s];Ca[r]===void 0&&(Ca[r]=s)}}}}var nS=typeof Uint8Array<"u",Bm=!(!(tS&&Ih&&Ih.brands.length>0)&&(kd().indexOf("Trident")!=-1||kd().indexOf("MSIE")!=-1))&&typeof btoa=="function";const Gd=/[-_.]/g,iS={"-":"+",_:"/",".":"="};function sS(e){return iS[e]||""}function km(e){if(!Bm)return eS(e);e=Gd.test(e)?e.replace(Gd,sS):e,e=atob(e);const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}function Mu(e){return nS&&e!=null&&e instanceof Uint8Array}var Gr={};function Ks(){return rS||(rS=new Pi(null,Gr))}function Su(e){zm(Gr);var t=e.g;return(t=t==null||Mu(t)?t:typeof t=="string"?km(t):null)==null?t:e.g=t}var Pi=class{h(){return new Uint8Array(Su(this)||0)}constructor(e,t){if(zm(t),this.g=e,e!=null&&e.length===0)throw Error("ByteString should be constructed with non-empty values")}};let rS,aS;function zm(e){if(e!==Gr)throw Error("illegal external caller")}function Gm(e,t){e.__closure__error__context__984382||(e.__closure__error__context__984382={}),e.__closure__error__context__984382.severity=t}function Uh(e){return Gm(e=Error(e),"warning"),e}function Vr(e,t){if(e!=null){var n=aS??(aS={}),i=n[e]||0;i>=t||(n[e]=i+1,Gm(e=Error(),"incident"),Nm(e))}}function ta(){return typeof BigInt=="function"}var ea=typeof Symbol=="function"&&typeof Symbol()=="symbol";function Ii(e,t,n=!1){return typeof Symbol=="function"&&typeof Symbol()=="symbol"?n&&Symbol.for&&e?Symbol.for(e):e!=null?Symbol(e):Symbol():t}var oS=Ii("jas",void 0,!0),Vd=Ii(void 0,"0di"),Aa=Ii(void 0,"1oa"),Gn=Ii(void 0,Symbol()),lS=Ii(void 0,"0ub"),cS=Ii(void 0,"0ubs"),Nh=Ii(void 0,"0ubsb"),hS=Ii(void 0,"0actk"),Hr=Ii("m_m","Pa",!0),Hd=Ii();const Vm={Ga:{value:0,configurable:!0,writable:!0,enumerable:!1}},Hm=Object.defineProperties,At=ea?oS:"Ga";var js;const Wd=[];function qa(e,t){ea||At in e||Hm(e,Vm),e[At]|=t}function en(e,t){ea||At in e||Hm(e,Vm),e[At]=t}function Ka(e){return qa(e,34),e}function ka(e){return qa(e,8192),e}en(Wd,7),js=Object.freeze(Wd);var Wr={};function Hn(e,t){return t===void 0?e.h!==Zs&&!!(2&(0|e.v[At])):!!(2&t)&&e.h!==Zs}const Zs={};function yu(e,t){if(e!=null){if(typeof e=="string")e=e?new Pi(e,Gr):Ks();else if(e.constructor!==Pi)if(Mu(e))e=e.length?new Pi(new Uint8Array(e),Gr):Ks();else{if(!t)throw Error();e=void 0}}return e}class Xd{constructor(t,n,i){this.g=t,this.h=n,this.l=i}next(){const t=this.g.next();return t.done||(t.value=this.h.call(this.l,t.value)),t}[Symbol.iterator](){return this}}var uS=Object.freeze({});function Wm(e,t,n){const i=128&t?0:-1,s=e.length;var r;(r=!!s)&&(r=(r=e[s-1])!=null&&typeof r=="object"&&r.constructor===Object);const a=s+(r?-1:0);for(t=128&t?1:0;t<a;t++)n(t-i,e[t]);if(r){e=e[s-1];for(const o in e)!isNaN(o)&&n(+o,e[o])}}var Xm={};function na(e){return 128&e?Xm:void 0}function wl(e){return e.Na=!0,e}var fS=wl(e=>typeof e=="number"),Yd=wl(e=>typeof e=="string"),dS=wl(e=>typeof e=="boolean"),Rl=typeof zr.BigInt=="function"&&typeof zr.BigInt(0)=="bigint";function Vn(e){var t=e;if(Yd(t)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(t))throw Error(String(t))}else if(fS(t)&&!Number.isSafeInteger(t))throw Error(String(t));return Rl?BigInt(e):e=dS(e)?e?"1":"0":Yd(e)?e.trim()||"0":String(e)}var Fh=wl(e=>Rl?e>=mS&&e<=_S:e[0]==="-"?qd(e,pS):qd(e,gS));const pS=Number.MIN_SAFE_INTEGER.toString(),mS=Rl?BigInt(Number.MIN_SAFE_INTEGER):void 0,gS=Number.MAX_SAFE_INTEGER.toString(),_S=Rl?BigInt(Number.MAX_SAFE_INTEGER):void 0;function qd(e,t){if(e.length>t.length)return!1;if(e.length<t.length||e===t)return!0;for(let n=0;n<e.length;n++){const i=e[n],s=t[n];if(i>s)return!1;if(i<s)return!0}}const vS=typeof Uint8Array.prototype.slice=="function";let xS,Re=0,We=0;function Kd(e){const t=e>>>0;Re=t,We=(e-t)/4294967296>>>0}function Xr(e){if(e<0){Kd(-e);const[t,n]=Tu(Re,We);Re=t>>>0,We=n>>>0}else Kd(e)}function Eu(e){const t=xS||(xS=new DataView(new ArrayBuffer(8)));t.setFloat32(0,+e,!0),We=0,Re=t.getUint32(0,!0)}function Ym(e,t){const n=4294967296*t+(e>>>0);return Number.isSafeInteger(n)?n:za(e,t)}function MS(e,t){return Vn(ta()?BigInt.asUintN(64,(BigInt(t>>>0)<<BigInt(32))+BigInt(e>>>0)):za(e,t))}function qm(e,t){return ta()?Vn(BigInt.asIntN(64,(BigInt.asUintN(32,BigInt(t))<<BigInt(32))+BigInt.asUintN(32,BigInt(e)))):Vn(bu(e,t))}function za(e,t){if(e>>>=0,(t>>>=0)<=2097151)var n=""+(4294967296*t+e);else ta()?n=""+(BigInt(t)<<BigInt(32)|BigInt(e)):(e=(16777215&e)+6777216*(n=16777215&(e>>>24|t<<8))+6710656*(t=t>>16&65535),n+=8147497*t,t*=2,e>=1e7&&(n+=e/1e7>>>0,e%=1e7),n>=1e7&&(t+=n/1e7>>>0,n%=1e7),n=t+Zd(n)+Zd(e));return n}function Zd(e){return e=String(e),"0000000".slice(e.length)+e}function bu(e,t){if(2147483648&t)if(ta())e=""+(BigInt(0|t)<<BigInt(32)|BigInt(e>>>0));else{const[n,i]=Tu(e,t);e="-"+za(n,i)}else e=za(e,t);return e}function Cl(e){if(e.length<16)Xr(Number(e));else if(ta())e=BigInt(e),Re=Number(e&BigInt(4294967295))>>>0,We=Number(e>>BigInt(32)&BigInt(4294967295));else{const t=+(e[0]==="-");We=Re=0;const n=e.length;for(let i=t,s=(n-t)%6+t;s<=n;i=s,s+=6){const r=Number(e.slice(i,s));We*=1e6,Re=1e6*Re+r,Re>=4294967296&&(We+=Math.trunc(Re/4294967296),We>>>=0,Re>>>=0)}if(t){const[i,s]=Tu(Re,We);Re=i,We=s}}}function Tu(e,t){return t=~t,e?e=1+~e:t+=1,[e,t]}function fi(e){return Array.prototype.slice.call(e)}const Za=typeof BigInt=="function"?BigInt.asIntN:void 0,SS=typeof BigInt=="function"?BigInt.asUintN:void 0,$s=Number.isSafeInteger,Pl=Number.isFinite,Yr=Math.trunc,yS=Vn(0);function Pa(e){if(e!=null&&typeof e!="number")throw Error(`Value of float/double field must be a number, found ${typeof e}: ${e}`);return e}function wi(e){return e==null||typeof e=="number"?e:e==="NaN"||e==="Infinity"||e==="-Infinity"?Number(e):void 0}function Ga(e){if(e!=null&&typeof e!="boolean"){var t=typeof e;throw Error(`Expected boolean but got ${t!="object"?t:e?Array.isArray(e)?"array":t:"null"}: ${e}`)}return e}function Km(e){return e==null||typeof e=="boolean"?e:typeof e=="number"?!!e:void 0}const ES=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function $a(e){switch(typeof e){case"bigint":return!0;case"number":return Pl(e);case"string":return ES.test(e);default:return!1}}function ia(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return Pl(e)?0|e:void 0}function Zm(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return Pl(e)?e>>>0:void 0}function $m(e){const t=e.length;return(e[0]==="-"?t<20||t===20&&e<="-9223372036854775808":t<19||t===19&&e<="9223372036854775807")?e:(Cl(e),bu(Re,We))}function Au(e){if(e=Yr(e),!$s(e)){Xr(e);var t=Re,n=We;(e=2147483648&n)&&(n=~n>>>0,(t=1+~t>>>0)==0&&(n=n+1>>>0)),e=typeof(t=Ym(t,n))=="number"?e?-t:t:e?"-"+t:t}return e}function Jm(e){var t=Yr(Number(e));return $s(t)?String(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),$m(e))}function jm(e){var t=Yr(Number(e));return $s(t)?Vn(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),ta()?Vn(Za(64,BigInt(e))):Vn($m(e)))}function Qm(e){return $s(e)?e=Vn(Au(e)):(e=Yr(e),$s(e)?e=String(e):(Xr(e),e=bu(Re,We)),e=Vn(e)),e}function fl(e){const t=typeof e;return e==null?e:t==="bigint"?Vn(Za(64,e)):$a(e)?t==="string"?jm(e):Qm(e):void 0}function t0(e){if(typeof e!="string")throw Error();return e}function Ja(e){if(e!=null&&typeof e!="string")throw Error();return e}function cn(e){return e==null||typeof e=="string"?e:void 0}function wu(e,t,n,i){return e!=null&&e[Hr]===Wr?e:Array.isArray(e)?((i=(n=0|e[At])|32&i|2&i)!==n&&en(e,i),new t(e)):(n?2&i?((e=t[Vd])||(Ka((e=new t).v),e=t[Vd]=e),t=e):t=new t:t=void 0,t)}function bS(e,t,n){if(t)t:{if(!$a(t=e))throw Uh("int64");switch(typeof t){case"string":t=jm(t);break t;case"bigint":t=Vn(Za(64,t));break t;default:t=Qm(t)}}else t=fl(e);return(e=t)==null?n?yS:void 0:e}const TS={};let AS=function(){try{return Al(new class extends Map{constructor(){super()}}),!1}catch{return!0}}();class Dc{constructor(){this.g=new Map}get(t){return this.g.get(t)}set(t,n){return this.g.set(t,n),this.size=this.g.size,this}delete(t){return t=this.g.delete(t),this.size=this.g.size,t}clear(){this.g.clear(),this.size=this.g.size}has(t){return this.g.has(t)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(t,n){return this.g.forEach(t,n)}[Symbol.iterator](){return this.entries()}}const wS=AS?(Object.setPrototypeOf(Dc.prototype,Map.prototype),Object.defineProperties(Dc.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),Dc):class extends Map{constructor(){super()}};function $d(e){return e}function Ic(e){if(2&e.J)throw Error("Cannot mutate an immutable Map")}var $i=class extends wS{constructor(e,t,n=$d,i=$d){super(),this.J=0|e[At],this.K=t,this.S=n,this.fa=this.K?RS:i;for(let s=0;s<e.length;s++){const r=e[s],a=n(r[0],!1,!0);let o=r[1];t?o===void 0&&(o=null):o=i(r[1],!1,!0,void 0,void 0,this.J),super.set(a,o)}}V(e){return ka(Array.from(super.entries(),e))}clear(){Ic(this),super.clear()}delete(e){return Ic(this),super.delete(this.S(e,!0,!1))}entries(){if(this.K){var e=super.keys();e=new Xd(e,CS,this)}else e=super.entries();return e}values(){if(this.K){var e=super.keys();e=new Xd(e,$i.prototype.get,this)}else e=super.values();return e}forEach(e,t){this.K?super.forEach((n,i,s)=>{e.call(t,s.get(i),i,s)}):super.forEach(e,t)}set(e,t){return Ic(this),(e=this.S(e,!0,!1))==null?this:t==null?(super.delete(e),this):super.set(e,this.fa(t,!0,!0,this.K,!1,this.J))}Ma(e){const t=this.S(e[0],!1,!0);e=e[1],e=this.K?e===void 0?null:e:this.fa(e,!1,!0,void 0,!1,this.J),super.set(t,e)}has(e){return super.has(this.S(e,!1,!1))}get(e){e=this.S(e,!1,!1);const t=super.get(e);if(t!==void 0){var n=this.K;return n?((n=this.fa(t,!1,!0,n,this.ra,this.J))!==t&&super.set(e,n),n):t}}[Symbol.iterator](){return this.entries()}};function RS(e,t,n,i,s,r){return e=wu(e,i,n,r),s&&(e=Cu(e)),e}function CS(e){return[e,this.get(e)]}let PS;function Jd(){return PS||(PS=new $i(Ka([]),void 0,void 0,void 0,TS))}function Ll(e){return Gn?e[Gn]:void 0}function dl(e,t){for(const n in e)!isNaN(n)&&t(e,+n,e[n])}$i.prototype.toJSON=void 0;var Oh=class{};const LS={Ka:!0};function DS(e,t){t<100||Vr(cS,1)}function Dl(e,t,n,i){const s=i!==void 0;i=!!i;var r,a=Gn;!s&&ea&&a&&(r=e[a])&&dl(r,DS),a=[];var o=e.length;let l;r=4294967295;let c=!1;const u=!!(64&t),f=u?128&t?0:-1:void 0;1&t||(l=o&&e[o-1],l!=null&&typeof l=="object"&&l.constructor===Object?r=--o:l=void 0,!u||128&t||s||(c=!0,r=r-f+f)),t=void 0;for(var h=0;h<o;h++){let p=e[h];if(p!=null&&(p=n(p,i))!=null)if(u&&h>=r){const _=h-f;(t??(t={}))[_]=p}else a[h]=p}if(l)for(let p in l){if((o=l[p])==null||(o=n(o,i))==null)continue;let _;h=+p,u&&!Number.isNaN(h)&&(_=h+f)<r?a[_]=o:(t??(t={}))[p]=o}return t&&(c?a.push(t):a[r]=t),s&&Gn&&(e=Ll(e))&&e instanceof Oh&&(a[Gn]=function(p){const _=new Oh;return dl(p,(S,m,d)=>{_[m]=fi(d)}),_.da=p.da,_}(e)),a}function IS(e){return e[0]=Va(e[0]),e[1]=Va(e[1]),e}function Va(e){switch(typeof e){case"number":return Number.isFinite(e)?e:""+e;case"bigint":return Fh(e)?Number(e):""+e;case"boolean":return e?1:0;case"object":if(Array.isArray(e)){var t=0|e[At];return e.length===0&&1&t?void 0:Dl(e,t,Va)}if(e!=null&&e[Hr]===Wr)return e0(e);if(e instanceof Pi){if((t=e.g)==null)e="";else if(typeof t=="string")e=t;else{if(Bm){for(var n="",i=0,s=t.length-10240;i<s;)n+=String.fromCharCode.apply(null,t.subarray(i,i+=10240));n+=String.fromCharCode.apply(null,i?t.subarray(i):t),t=btoa(n)}else{n===void 0&&(n=0),Om(),n=Fm[n],i=Array(Math.floor(t.length/3)),s=n[64]||"";let c=0,u=0;for(;c<t.length-2;c+=3){var r=t[c],a=t[c+1],o=t[c+2],l=n[r>>2];r=n[(3&r)<<4|a>>4],a=n[(15&a)<<2|o>>6],o=n[63&o],i[u++]=l+r+a+o}switch(l=0,o=s,t.length-c){case 2:o=n[(15&(l=t[c+1]))<<2]||s;case 1:t=t[c],i[u]=n[t>>2]+n[(3&t)<<4|l>>4]+o+s}t=i.join("")}e=e.g=t}return e}return e instanceof $i?e=e.size!==0?e.V(IS):void 0:void 0}return e}let US,NS;function e0(e){return Dl(e=e.v,0|e[At],Va)}function zs(e,t){return n0(e,t[0],t[1])}function n0(e,t,n,i=0){if(e==null){var s=32;n?(e=[n],s|=128):e=[],t&&(s=-16760833&s|(1023&t)<<14)}else{if(!Array.isArray(e))throw Error("narr");if(s=0|e[At],Bd&&1&s)throw Error("rfarr");if(2048&s&&!(2&s)&&function(){if(Bd)throw Error("carr");Vr(hS,5)}(),256&s)throw Error("farr");if(64&s)return(s|i)!==s&&en(e,s|i),e;if(n&&(s|=128,n!==e[0]))throw Error("mid");t:{s|=64;var r=(n=e).length;if(r){var a=r-1;const l=n[a];if(l!=null&&typeof l=="object"&&l.constructor===Object){if((a-=t=128&s?0:-1)>=1024)throw Error("pvtlmt");for(var o in l)(r=+o)<a&&(n[r+t]=l[o],delete l[o]);s=-16760833&s|(1023&a)<<14;break t}}if(t){if((o=Math.max(t,r-(128&s?0:-1)))>1024)throw Error("spvt");s=-16760833&s|(1023&o)<<14}}}return en(e,64|s|i),e}function FS(e,t){if(typeof e!="object")return e;if(Array.isArray(e)){var n=0|e[At];return e.length===0&&1&n?void 0:jd(e,n,t)}if(e!=null&&e[Hr]===Wr)return Qd(e);if(e instanceof $i){if(2&(t=e.J))return e;if(!e.size)return;if(n=Ka(e.V()),e.K)for(e=0;e<n.length;e++){const i=n[e];let s=i[1];s=s==null||typeof s!="object"?void 0:s!=null&&s[Hr]===Wr?Qd(s):Array.isArray(s)?jd(s,0|s[At],!!(32&t)):void 0,i[1]=s}return n}return e instanceof Pi?e:void 0}function jd(e,t,n){return 2&t||(!n||4096&t||16&t?e=sa(e,t,!1,n&&!(16&t)):(qa(e,34),4&t&&Object.freeze(e))),e}function Ru(e,t,n){return e=new e.constructor(t),n&&(e.h=Zs),e.m=Zs,e}function Qd(e){const t=e.v,n=0|t[At];return Hn(e,n)?e:Pu(e,t,n)?Ru(e,t):sa(t,n)}function sa(e,t,n,i){return i??(i=!!(34&t)),e=Dl(e,t,FS,i),i=32,n&&(i|=2),en(e,t=16769217&t|i),e}function Cu(e){const t=e.v,n=0|t[At];return Hn(e,n)?Pu(e,t,n)?Ru(e,t,!0):new e.constructor(sa(t,n,!1)):e}function ra(e){if(e.h!==Zs)return!1;var t=e.v;return qa(t=sa(t,0|t[At]),2048),e.v=t,e.h=void 0,e.m=void 0,!0}function aa(e){if(!ra(e)&&Hn(e,0|e.v[At]))throw Error()}function Qs(e,t){t===void 0&&(t=0|e[At]),32&t&&!(4096&t)&&en(e,4096|t)}function Pu(e,t,n){return!!(2&n)||!(!(32&n)||4096&n)&&(en(t,2|n),e.h=Zs,!0)}const i0=Vn(0),cs={};function Ce(e,t,n,i,s){if((t=Ji(e.v,t,n,s))!==null||i&&e.m!==Zs)return t}function Ji(e,t,n,i){if(t===-1)return null;const s=t+(n?0:-1),r=e.length-1;let a,o;if(!(r<1+(n?0:-1))){if(s>=r)if(a=e[r],a!=null&&typeof a=="object"&&a.constructor===Object)n=a[t],o=!0;else{if(s!==r)return;n=a}else n=e[s];if(i&&n!=null){if((i=i(n))==null)return i;if(!Object.is(i,n))return o?a[t]=i:e[s]=i,i}return n}}function fe(e,t,n,i){aa(e),Je(e=e.v,0|e[At],t,n,i)}function Je(e,t,n,i,s){const r=n+(s?0:-1);var a=e.length-1;if(a>=1+(s?0:-1)&&r>=a){const o=e[a];if(o!=null&&typeof o=="object"&&o.constructor===Object)return o[n]=i,t}return r<=a?(e[r]=i,t):(i!==void 0&&(n>=(a=(t??(t=0|e[At]))>>14&1023||536870912)?i!=null&&(e[a+(s?0:-1)]={[n]:i}):e[r]=i),t)}function Bs(){return uS===void 0?2:4}function ks(e,t,n,i,s){let r=e.v,a=0|r[At];i=Hn(e,a)?1:i,s=!!s||i===3,i===2&&ra(e)&&(r=e.v,a=0|r[At]);let o=(e=Lu(r,t))===js?7:0|e[At],l=Du(o,a);var c=!(4&l);if(c){4&l&&(e=fi(e),o=0,l=Vs(l,a),a=Je(r,a,t,e));let u=0,f=0;for(;u<e.length;u++){const h=n(e[u]);h!=null&&(e[f++]=h)}f<u&&(e.length=f),n=-513&(4|l),l=n&=-1025,l&=-4097}return l!==o&&(en(e,l),2&l&&Object.freeze(e)),s0(e,l,r,a,t,i,c,s)}function s0(e,t,n,i,s,r,a,o){let l=t;return r===1||r===4&&(2&t||!(16&t)&&32&i)?Gs(t)||((t|=!e.length||a&&!(4096&t)||32&i&&!(4096&t||16&t)?2:256)!==l&&en(e,t),Object.freeze(e)):(r===2&&Gs(t)&&(e=fi(e),l=0,t=Vs(t,i),i=Je(n,i,s,e)),Gs(t)||(o||(t|=16),t!==l&&en(e,t))),2&t||!(4096&t||16&t)||Qs(n,i),e}function Lu(e,t,n){return e=Ji(e,t,n),Array.isArray(e)?e:js}function Du(e,t){return 2&t&&(e|=2),1|e}function Gs(e){return!!(2&e)&&!!(4&e)||!!(256&e)}function r0(e){return yu(e,!0)}function a0(e){e=fi(e);for(let t=0;t<e.length;t++){const n=e[t]=fi(e[t]);Array.isArray(n[1])&&(n[1]=Ka(n[1]))}return ka(e)}function fs(e,t,n,i){aa(e),Je(e=e.v,0|e[At],t,(i==="0"?Number(n)===0:n===i)?void 0:n)}function oa(e,t,n){if(2&t)throw Error();const i=na(t);let s=Lu(e,n,i),r=s===js?7:0|s[At],a=Du(r,t);return(2&a||Gs(a)||16&a)&&(a===r||Gs(a)||en(s,a),s=fi(s),r=0,a=Vs(a,t),Je(e,t,n,s,i)),a&=-13,a!==r&&en(s,a),s}function Uc(e,t){var n=J0;return Uu(Iu(e=e.v),e,void 0,n)===t?t:-1}function Iu(e){if(ea)return e[Aa]??(e[Aa]=new Map);if(Aa in e)return e[Aa];const t=new Map;return Object.defineProperty(e,Aa,{value:t}),t}function o0(e,t,n,i,s){const r=Iu(e),a=Uu(r,e,t,n,s);return a!==i&&(a&&(t=Je(e,t,a,void 0,s)),r.set(n,i)),t}function Uu(e,t,n,i,s){let r=e.get(i);if(r!=null)return r;r=0;for(let a=0;a<i.length;a++){const o=i[a];Ji(t,o,s)!=null&&(r!==0&&(n=Je(t,n,r,void 0,s)),r=o)}return e.set(i,r),r}function Nu(e,t,n){let i=0|e[At];const s=na(i),r=Ji(e,n,s);let a;if(r!=null&&r[Hr]===Wr){if(!Hn(r))return ra(r),r.v;a=r.v}else Array.isArray(r)&&(a=r);if(a){const o=0|a[At];2&o&&(a=sa(a,o))}return a=zs(a,t),a!==r&&Je(e,i,n,a,s),a}function l0(e,t,n,i,s){let r=!1;if((i=Ji(e,i,s,a=>{const o=wu(a,n,!1,t);return r=o!==a&&o!=null,o}))!=null)return r&&!Hn(i)&&Qs(e,t),i}function re(e,t,n,i){let s=e.v,r=0|s[At];if((t=l0(s,r,t,n,i))==null)return t;if(r=0|s[At],!Hn(e,r)){const a=Cu(t);a!==t&&(ra(e)&&(s=e.v,r=0|s[At]),r=Je(s,r,n,t=a,i),Qs(s,r))}return t}function c0(e,t,n,i,s,r,a,o){var l=Hn(e,n);r=l?1:r,a=!!a||r===3,l=o&&!l,(r===2||l)&&ra(e)&&(n=0|(t=e.v)[At]);var c=(e=Lu(t,s))===js?7:0|e[At],u=Du(c,n);if(o=!(4&u)){var f=e,h=n;const p=!!(2&u);p&&(h|=2);let _=!p,S=!0,m=0,d=0;for(;m<f.length;m++){const y=wu(f[m],i,!1,h);if(y instanceof i){if(!p){const E=Hn(y);_&&(_=!E),S&&(S=E)}f[d++]=y}}d<m&&(f.length=d),u|=4,u=S?-4097&u:4096|u,u=_?8|u:-9&u}if(u!==c&&(en(e,u),2&u&&Object.freeze(e)),l&&!(8&u||!e.length&&(r===1||r===4&&(2&u||!(16&u)&&32&n)))){for(Gs(u)&&(e=fi(e),u=Vs(u,n),n=Je(t,n,s,e)),i=e,l=u,c=0;c<i.length;c++)(f=i[c])!==(u=Cu(f))&&(i[c]=u);l|=8,en(e,u=l=i.length?4096|l:-4097&l)}return s0(e,u,t,n,s,r,o,a)}function ji(e,t,n){const i=e.v;return c0(e,i,0|i[At],t,n,Bs(),!1,!0)}function h0(e){return e==null&&(e=void 0),e}function Nt(e,t,n,i,s){return fe(e,n,i=h0(i),s),i&&!Hn(i)&&Qs(e.v),e}function Da(e,t,n,i){t:{var s=i=h0(i);aa(e);const r=e.v;let a=0|r[At];if(s==null){const o=Iu(r);if(Uu(o,r,a,n)!==t)break t;o.set(n,0)}else a=o0(r,a,n,t);Je(r,a,t,s)}i&&!Hn(i)&&Qs(e.v)}function Vs(e,t){return-273&(2&t?2|e:-3&e)}function Fu(e,t,n,i){var s=i;aa(e),e=c0(e,i=e.v,0|i[At],n,t,2,!0),s=s??new n,e.push(s),t=n=e===js?7:0|e[At],(s=Hn(s))?(n&=-9,e.length===1&&(n&=-4097)):n|=4096,n!==t&&en(e,n),s||Qs(i)}function ii(e,t,n){return ia(Ce(e,t,void 0,n))}function Ge(e,t){return Ce(e,t,void 0,void 0,wi)??0}function Qi(e,t,n){if(n!=null){if(typeof n!="number"||!Pl(n))throw Uh("int32");n|=0}fe(e,t,n)}function Dt(e,t,n){fe(e,t,Pa(n))}function Wn(e,t,n){fs(e,t,Ja(n),"")}function pl(e,t,n){{aa(e);const a=e.v;let o=0|a[At];if(n==null)Je(a,o,t);else{var i=e=n===js?7:0|n[At],s=Gs(e),r=s||Object.isFrozen(n);for(s||(e=0),r||(n=fi(n),i=0,e=Vs(e,o),r=!1),e|=5,e|=(4&e?512&e?512:1024&e?1024:0:void 0)??1024,s=0;s<n.length;s++){const l=n[s],c=t0(l);Object.is(l,c)||(r&&(n=fi(n),i=0,e=Vs(e,o),r=!1),n[s]=c)}e!==i&&(r&&(n=fi(n),e=Vs(e,o)),en(n,e)),Je(a,o,t,n)}}}function Il(e,t,n){aa(e),ks(e,t,cn,2,!0).push(t0(n))}var Er=class{constructor(e,t,n){if(this.buffer=e,n&&!t)throw Error();this.g=t}};function Ou(e,t){if(typeof e=="string")return new Er(km(e),t);if(Array.isArray(e))return new Er(new Uint8Array(e),t);if(e.constructor===Uint8Array)return new Er(e,!1);if(e.constructor===ArrayBuffer)return e=new Uint8Array(e),new Er(e,!1);if(e.constructor===Pi)return t=Su(e)||new Uint8Array(0),new Er(t,!0,e);if(e instanceof Uint8Array)return e=e.constructor===Uint8Array?e:new Uint8Array(e.buffer,e.byteOffset,e.byteLength),new Er(e,!1);throw Error()}function Bu(e,t){let n,i=0,s=0,r=0;const a=e.h;let o=e.g;do n=a[o++],i|=(127&n)<<r,r+=7;while(r<32&&128&n);if(r>32)for(s|=(127&n)>>4,r=3;r<32&&128&n;r+=7)n=a[o++],s|=(127&n)<<r;if(Hs(e,o),!(128&n))return t(i>>>0,s>>>0);throw Error()}function ku(e){let t=0,n=e.g;const i=n+10,s=e.h;for(;n<i;){const r=s[n++];if(t|=r,(128&r)==0)return Hs(e,n),!!(127&t)}throw Error()}function xs(e){const t=e.h;let n=e.g,i=t[n++],s=127&i;if(128&i&&(i=t[n++],s|=(127&i)<<7,128&i&&(i=t[n++],s|=(127&i)<<14,128&i&&(i=t[n++],s|=(127&i)<<21,128&i&&(i=t[n++],s|=i<<28,128&i&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++])))))throw Error();return Hs(e,n),s}function Di(e){return xs(e)>>>0}function ml(e){var t=e.h;const n=e.g;var i=t[n],s=t[n+1];const r=t[n+2];return t=t[n+3],Hs(e,e.g+4),e=2*((s=(i<<0|s<<8|r<<16|t<<24)>>>0)>>31)+1,i=s>>>23&255,s&=8388607,i==255?s?NaN:e*(1/0):i==0?1401298464324817e-60*e*s:e*Math.pow(2,i-150)*(s+8388608)}function OS(e){return xs(e)}function Hs(e,t){if(e.g=t,t>e.l)throw Error()}function u0(e,t){if(t<0)throw Error();const n=e.g;if((t=n+t)>e.l)throw Error();return e.g=t,n}function f0(e,t){if(t==0)return Ks();var n=u0(e,t);return e.Y&&e.j?n=e.h.subarray(n,n+t):(e=e.h,n=n===(t=n+t)?new Uint8Array(0):vS?e.slice(n,t):new Uint8Array(e.subarray(n,t))),n.length==0?Ks():new Pi(n,Gr)}var tp=[];function d0(e,t,n,i){if(gl.length){const s=gl.pop();return s.o(i),s.g.init(e,t,n,i),s}return new BS(e,t,n,i)}function p0(e){e.g.clear(),e.l=-1,e.h=-1,gl.length<100&&gl.push(e)}function m0(e){var t=e.g;if(t.g==t.l)return!1;e.m=e.g.g;var n=Di(e.g);if(t=n>>>3,!((n&=7)>=0&&n<=5)||t<1)throw Error();return e.l=t,e.h=n,!0}function jo(e){switch(e.h){case 0:e.h!=0?jo(e):ku(e.g);break;case 1:Hs(e=e.g,e.g+8);break;case 2:if(e.h!=2)jo(e);else{var t=Di(e.g);Hs(e=e.g,e.g+t)}break;case 5:Hs(e=e.g,e.g+4);break;case 3:for(t=e.l;;){if(!m0(e))throw Error();if(e.h==4){if(e.l!=t)throw Error();break}jo(e)}break;default:throw Error()}}function ja(e,t,n){const i=e.g.l;var s=Di(e.g);let r=(s=e.g.g+s)-i;if(r<=0&&(e.g.l=s,n(t,e,void 0,void 0,void 0),r=s-e.g.g),r)throw Error();return e.g.g=s,e.g.l=i,t}function zu(e){var t=Di(e.g),n=u0(e=e.g,t);if(e=e.h,JM){var i,s=e;(i=Lc)||(i=Lc=new TextDecoder("utf-8",{fatal:!0})),t=n+t,s=n===0&&t===s.length?s:s.subarray(n,t);try{var r=i.decode(s)}catch(o){if(Fo===void 0){try{i.decode(new Uint8Array([128]))}catch{}try{i.decode(new Uint8Array([97])),Fo=!0}catch{Fo=!1}}throw!Fo&&(Lc=void 0),o}}else{t=(r=n)+t,n=[];let o,l=null;for(;r<t;){var a=e[r++];a<128?n.push(a):a<224?r>=t?Rs():(o=e[r++],a<194||(192&o)!=128?(r--,Rs()):n.push((31&a)<<6|63&o)):a<240?r>=t-1?Rs():(o=e[r++],(192&o)!=128||a===224&&o<160||a===237&&o>=160||(192&(i=e[r++]))!=128?(r--,Rs()):n.push((15&a)<<12|(63&o)<<6|63&i)):a<=244?r>=t-2?Rs():(o=e[r++],(192&o)!=128||o-144+(a<<28)>>30||(192&(i=e[r++]))!=128||(192&(s=e[r++]))!=128?(r--,Rs()):(a=(7&a)<<18|(63&o)<<12|(63&i)<<6|63&s,a-=65536,n.push(55296+(a>>10&1023),56320+(1023&a)))):Rs(),n.length>=8192&&(l=Od(l,n),n.length=0)}r=Od(l,n)}return r}function g0(e){const t=Di(e.g);return f0(e.g,t)}function Ul(e,t,n){var i=Di(e.g);for(i=e.g.g+i;e.g.g<i;)n.push(t(e.g))}var BS=class{constructor(e,t,n,i){if(tp.length){const s=tp.pop();s.init(e,t,n,i),e=s}else e=new class{constructor(s,r,a,o){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.init(s,r,a,o)}init(s,r,a,{Y:o=!1,ea:l=!1}={}){this.Y=o,this.ea=l,s&&(s=Ou(s,this.ea),this.h=s.buffer,this.j=s.g,this.m=r||0,this.l=a!==void 0?this.m+a:this.h.length,this.g=this.m)}clear(){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.Y=!1}}(e,t,n,i);this.g=e,this.m=this.g.g,this.h=this.l=-1,this.o(i)}o({ha:e=!1}={}){this.ha=e}},gl=[];function ep(e){return e?/^\d+$/.test(e)?(Cl(e),new Bh(Re,We)):null:kS||(kS=new Bh(0,0))}var Bh=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let kS;function np(e){return e?/^-?\d+$/.test(e)?(Cl(e),new kh(Re,We)):null:zS||(zS=new kh(0,0))}var kh=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let zS;function Ir(e,t,n){for(;n>0||t>127;)e.g.push(127&t|128),t=(t>>>7|n<<25)>>>0,n>>>=7;e.g.push(t)}function la(e,t){for(;t>127;)e.g.push(127&t|128),t>>>=7;e.g.push(t)}function Nl(e,t){if(t>=0)la(e,t);else{for(let n=0;n<9;n++)e.g.push(127&t|128),t>>=7;e.g.push(1)}}function Gu(e){var t=Re;e.g.push(t>>>0&255),e.g.push(t>>>8&255),e.g.push(t>>>16&255),e.g.push(t>>>24&255)}function qr(e,t){t.length!==0&&(e.l.push(t),e.h+=t.length)}function si(e,t,n){la(e.g,8*t+n)}function Vu(e,t){return si(e,t,2),t=e.g.end(),qr(e,t),t.push(e.h),t}function Hu(e,t){var n=t.pop();for(n=e.h+e.g.length()-n;n>127;)t.push(127&n|128),n>>>=7,e.h++;t.push(n),e.h++}function Fl(e,t,n){si(e,t,2),la(e.g,n.length),qr(e,e.g.end()),qr(e,n)}function _l(e,t,n,i){n!=null&&(t=Vu(e,t),i(n,e),Hu(e,t))}function Ui(){const e=class{constructor(){throw Error()}};return Object.setPrototypeOf(e,e.prototype),e}var Wu=Ui(),_0=Ui(),Xu=Ui(),Yu=Ui(),qu=Ui(),v0=Ui(),GS=Ui(),Ol=Ui(),x0=Ui(),M0=Ui();function Ni(e,t,n){var i=e.v;Gn&&Gn in i&&(i=i[Gn])&&delete i[t.g],t.h?t.j(e,t.h,t.g,n,t.l):t.j(e,t.g,n,t.l)}var wt=class{constructor(e,t){this.v=n0(e,t,void 0,2048)}toJSON(){return e0(this)}j(){var s;var e=yy,t=this.v,n=e.g,i=Gn;if(ea&&i&&((s=t[i])==null?void 0:s[n])!=null&&Vr(lS,3),t=e.g,Hd&&Gn&&Hd===void 0&&(i=(n=this.v)[Gn])&&(i=i.da))try{i(n,t,LS)}catch(r){Nm(r)}return e.h?e.m(this,e.h,e.g,e.l):e.m(this,e.g,e.defaultValue,e.l)}clone(){const e=this.v,t=0|e[At];return Pu(this,e,t)?Ru(this,e,!0):new this.constructor(sa(e,t,!1))}};wt.prototype[Hr]=Wr,wt.prototype.toString=function(){return this.v.toString()};var ca=class{constructor(e,t,n){this.g=e,this.h=t,e=Wu,this.l=!!e&&n===e||!1}};function Bl(e,t){return new ca(e,t,Wu)}function S0(e,t,n,i,s){_l(e,n,T0(t,i),s)}const VS=Bl(function(e,t,n,i,s){return e.h===2&&(ja(e,Nu(t,i,n),s),!0)},S0),HS=Bl(function(e,t,n,i,s){return e.h===2&&(ja(e,Nu(t,i,n),s),!0)},S0);var kl=Symbol(),zl=Symbol(),zh=Symbol(),ip=Symbol(),sp=Symbol();let y0,E0;function tr(e,t,n,i){var s=i[e];if(s)return s;(s={}).qa=i,s.T=function(f){switch(typeof f){case"boolean":return US||(US=[0,void 0,!0]);case"number":return f>0?void 0:f===0?NS||(NS=[0,void 0]):[-f,void 0];case"string":return[0,f];case"object":return f}}(i[0]);var r=i[1];let a=1;r&&r.constructor===Object&&(s.ba=r,typeof(r=i[++a])=="function"&&(s.ma=!0,y0??(y0=r),E0??(E0=i[a+1]),r=i[a+=2]));const o={};for(;r&&Array.isArray(r)&&r.length&&typeof r[0]=="number"&&r[0]>0;){for(var l=0;l<r.length;l++)o[r[l]]=r;r=i[++a]}for(l=1;r!==void 0;){let f;typeof r=="number"&&(l+=r,r=i[++a]);var c=void 0;if(r instanceof ca?f=r:(f=VS,a--),f==null?void 0:f.l){r=i[++a],c=i;var u=a;typeof r=="function"&&(r=r(),c[u]=r),c=r}for(u=l+1,typeof(r=i[++a])=="number"&&r<0&&(u-=r,r=i[++a]);l<u;l++){const h=o[l];c?n(s,l,f,c,h):t(s,l,f,h)}}return i[e]=s}function b0(e){return Array.isArray(e)?e[0]instanceof ca?e:[HS,e]:[e,void 0]}function T0(e,t){return e instanceof wt?e.v:Array.isArray(e)?zs(e,t):void 0}function Ku(e,t,n,i){const s=n.g;e[t]=i?(r,a,o)=>s(r,a,o,i):s}function Zu(e,t,n,i,s){const r=n.g;let a,o;e[t]=(l,c,u)=>r(l,c,u,o||(o=tr(zl,Ku,Zu,i).T),a||(a=$u(i)),s)}function $u(e){let t=e[zh];if(t!=null)return t;const n=tr(zl,Ku,Zu,e);return t=n.ma?(i,s)=>y0(i,s,n):(i,s)=>{for(;m0(s)&&s.h!=4;){var r=s.l,a=n[r];if(a==null){var o=n.ba;o&&(o=o[r])&&(o=XS(o))!=null&&(a=n[r]=o)}if(a==null||!a(s,i,r)){if(a=(o=s).m,jo(o),o.ha)var l=void 0;else l=o.g.g-a,o.g.g=a,l=f0(o.g,l);a=void 0,o=i,l&&((a=o[Gn]??(o[Gn]=new Oh))[r]??(a[r]=[])).push(l)}}return(i=Ll(i))&&(i.da=n.qa[sp]),!0},e[zh]=t,e[sp]=WS.bind(e),t}function WS(e,t,n,i){var s=this[zl];const r=this[zh],a=zs(void 0,s.T),o=Ll(e);if(o){var l=!1,c=s.ba;if(c){if(s=(u,f,h)=>{if(h.length!==0)if(c[f])for(const p of h){u=d0(p);try{l=!0,r(a,u)}finally{p0(u)}}else i==null||i(e,f,h)},t==null)dl(o,s);else if(o!=null){const u=o[t];u&&s(o,t,u)}if(l){let u=0|e[At];if(2&u&&2048&u&&!(n!=null&&n.Ka))throw Error();const f=na(u),h=(p,_)=>{if(Ji(e,p,f)!=null){if((n==null?void 0:n.Qa)===1)return;throw Error()}_!=null&&(u=Je(e,u,p,_,f)),delete o[p]};t==null?Wm(a,0|a[At],(p,_)=>{h(p,_)}):h(t,Ji(a,t,f))}}}}function XS(e){const t=(e=b0(e))[0].g;if(e=e[1]){const n=$u(e),i=tr(zl,Ku,Zu,e).T;return(s,r,a)=>t(s,r,a,i,n)}return t}function Gl(e,t,n){e[t]=n.h}function Vl(e,t,n,i){let s,r;const a=n.h;e[t]=(o,l,c)=>a(o,l,c,r||(r=tr(kl,Gl,Vl,i).T),s||(s=A0(i)))}function A0(e){let t=e[ip];if(!t){const n=tr(kl,Gl,Vl,e);t=(i,s)=>w0(i,s,n),e[ip]=t}return t}function w0(e,t,n){Wm(e,0|e[At],(i,s)=>{if(s!=null){var r=function(a,o){var l=a[o];if(l)return l;if((l=a.ba)&&(l=l[o])){var c=(l=b0(l))[0].h;if(l=l[1]){const u=A0(l),f=tr(kl,Gl,Vl,l).T;l=a.ma?E0(f,u):(h,p,_)=>c(h,p,_,f,u)}else l=c;return a[o]=l}}(n,i);r?r(t,s,i):i<500||Vr(Nh,3)}}),(e=Ll(e))&&dl(e,(i,s,r)=>{for(qr(t,t.g.end()),i=0;i<r.length;i++)qr(t,Su(r[i])||new Uint8Array(0))})}const YS=Vn(0);function ha(e,t){if(Array.isArray(t)){var n=0|t[At];if(4&n)return t;for(var i=0,s=0;i<t.length;i++){const r=e(t[i]);r!=null&&(t[s++]=r)}return s<i&&(t.length=s),(e=-1537&(5|n))!==n&&en(t,e),2&e&&Object.freeze(t),t}}function xn(e,t,n){return new ca(e,t,n)}function ua(e,t,n){return new ca(e,t,n)}function Mn(e,t,n){Je(e,0|e[At],t,n,na(0|e[At]))}var qS=Bl(function(e,t,n,i,s){if(e.h!==2)return!1;if(e=fi(e=ja(e,zs([void 0,void 0],i),s)),s=na(i=0|t[At]),2&i)throw Error();let r=Ji(t,n,s);if(r instanceof $i)2&r.J?(r=r.V(),r.push(e),Je(t,i,n,r,s)):r.Ma(e);else if(Array.isArray(r)){var a=0|r[At];8192&a||en(r,a|=8192),2&a&&(r=a0(r),Je(t,i,n,r,s)),r.push(e)}else Je(t,i,n,ka([e]),s);return!0},function(e,t,n,i,s){if(t instanceof $i)t.forEach((r,a)=>{_l(e,n,zs([a,r],i),s)});else if(Array.isArray(t)){for(let r=0;r<t.length;r++){const a=t[r];Array.isArray(a)&&_l(e,n,zs(a,i),s)}ka(t)}});function R0(e,t,n){(t=wi(t))!=null&&(si(e,n,5),e=e.g,Eu(t),Gu(e))}function C0(e,t,n){if(t=function(i){if(i==null)return i;const s=typeof i;if(s==="bigint")return String(Za(64,i));if($a(i)){if(s==="string")return Jm(i);if(s==="number")return Au(i)}}(t),t!=null&&(typeof t=="string"&&np(t),t!=null))switch(si(e,n,0),typeof t){case"number":e=e.g,Xr(t),Ir(e,Re,We);break;case"bigint":n=BigInt.asUintN(64,t),n=new kh(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),Ir(e.g,n.h,n.g);break;default:n=np(t),Ir(e.g,n.h,n.g)}}function P0(e,t,n){(t=ia(t))!=null&&t!=null&&(si(e,n,0),Nl(e.g,t))}function L0(e,t,n){(t=Km(t))!=null&&(si(e,n,0),e.g.g.push(t?1:0))}function D0(e,t,n){(t=cn(t))!=null&&Fl(e,n,Um(t))}function I0(e,t,n,i,s){_l(e,n,T0(t,i),s)}function U0(e,t,n){(t=t==null||typeof t=="string"||t instanceof Pi?t:void 0)!=null&&Fl(e,n,Ou(t,!0).buffer)}function N0(e,t,n){(t=Zm(t))!=null&&t!=null&&(si(e,n,0),la(e.g,t))}function F0(e,t,n){return(e.h===5||e.h===2)&&(t=oa(t,0|t[At],n),e.h==2?Ul(e,ml,t):t.push(ml(e.g)),!0)}var Xe=xn(function(e,t,n){return e.h===5&&(Mn(t,n,ml(e.g)),!0)},R0,Ol),KS=ua(F0,function(e,t,n){if((t=ha(wi,t))!=null)for(let a=0;a<t.length;a++){var i=e,s=n,r=t[a];r!=null&&(si(i,s,5),i=i.g,Eu(r),Gu(i))}},Ol),Ju=ua(F0,function(e,t,n){if((t=ha(wi,t))!=null&&t.length){si(e,n,2),la(e.g,4*t.length);for(let i=0;i<t.length;i++)n=e.g,Eu(t[i]),Gu(n)}},Ol),ZS=xn(function(e,t,n){return e.h===5&&(Mn(t,n,(e=ml(e.g))===0?void 0:e),!0)},R0,Ol),Ms=xn(function(e,t,n){return e.h!==0?e=!1:(Mn(t,n,Bu(e.g,qm)),e=!0),e},C0,v0),Nc=xn(function(e,t,n){return e.h!==0?t=!1:(Mn(t,n,(e=Bu(e.g,qm))===YS?void 0:e),t=!0),t},C0,v0),$S=xn(function(e,t,n){return e.h!==0?e=!1:(Mn(t,n,Bu(e.g,MS)),e=!0),e},function(e,t,n){if(t=function(i){if(i==null)return i;var s=typeof i;if(s==="bigint")return String(SS(64,i));if($a(i)){if(s==="string")return s=Yr(Number(i)),$s(s)&&s>=0?i=String(s):((s=i.indexOf("."))!==-1&&(i=i.substring(0,s)),(s=i[0]!=="-"&&((s=i.length)<20||s===20&&i<="18446744073709551615"))||(Cl(i),i=za(Re,We))),i;if(s==="number")return(i=Yr(i))>=0&&$s(i)||(Xr(i),i=Ym(Re,We)),i}}(t),t!=null&&(typeof t=="string"&&ep(t),t!=null))switch(si(e,n,0),typeof t){case"number":e=e.g,Xr(t),Ir(e,Re,We);break;case"bigint":n=BigInt.asUintN(64,t),n=new Bh(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),Ir(e.g,n.h,n.g);break;default:n=ep(t),Ir(e.g,n.h,n.g)}},GS),$e=xn(function(e,t,n){return e.h===0&&(Mn(t,n,xs(e.g)),!0)},P0,Yu),Qa=ua(function(e,t,n){return(e.h===0||e.h===2)&&(t=oa(t,0|t[At],n),e.h==2?Ul(e,xs,t):t.push(xs(e.g)),!0)},function(e,t,n){if((t=ha(ia,t))!=null&&t.length){n=Vu(e,n);for(let i=0;i<t.length;i++)Nl(e.g,t[i]);Hu(e,n)}},Yu),wr=xn(function(e,t,n){return e.h===0&&(Mn(t,n,(e=xs(e.g))===0?void 0:e),!0)},P0,Yu),Pe=xn(function(e,t,n){return e.h===0&&(Mn(t,n,ku(e.g)),!0)},L0,_0),Ws=xn(function(e,t,n){return e.h===0&&(Mn(t,n,(e=ku(e.g))===!1?void 0:e),!0)},L0,_0),dn=ua(function(e,t,n){return e.h===2&&(e=zu(e),oa(t,0|t[At],n).push(e),!0)},function(e,t,n){if((t=ha(cn,t))!=null)for(let a=0;a<t.length;a++){var i=e,s=n,r=t[a];r!=null&&Fl(i,s,Um(r))}},Xu),ps=xn(function(e,t,n){return e.h===2&&(Mn(t,n,(e=zu(e))===""?void 0:e),!0)},D0,Xu),me=xn(function(e,t,n){return e.h===2&&(Mn(t,n,zu(e)),!0)},D0,Xu),an=function(e,t,n=Wu){return new ca(e,t,n)}(function(e,t,n,i,s){return e.h===2&&(i=zs(void 0,i),oa(t,0|t[At],n).push(i),ja(e,i,s),!0)},function(e,t,n,i,s){if(Array.isArray(t)){for(let r=0;r<t.length;r++)I0(e,t[r],n,i,s);1&(e=0|t[At])||en(t,1|e)}}),Ee=Bl(function(e,t,n,i,s,r){if(e.h!==2)return!1;let a=0|t[At];return o0(t,a,r,n,na(a)),ja(e,t=Nu(t,i,n),s),!0},I0),O0=xn(function(e,t,n){return e.h===2&&(Mn(t,n,g0(e)),!0)},U0,x0),JS=ua(function(e,t,n){return(e.h===0||e.h===2)&&(t=oa(t,0|t[At],n),e.h==2?Ul(e,Di,t):t.push(Di(e.g)),!0)},function(e,t,n){if((t=ha(Zm,t))!=null)for(let a=0;a<t.length;a++){var i=e,s=n,r=t[a];r!=null&&(si(i,s,0),la(i.g,r))}},qu),jS=xn(function(e,t,n){return e.h===0&&(Mn(t,n,(e=Di(e.g))===0?void 0:e),!0)},N0,qu),gn=xn(function(e,t,n){return e.h===0&&(Mn(t,n,xs(e.g)),!0)},function(e,t,n){(t=ia(t))!=null&&(t=parseInt(t,10),si(e,n,0),Nl(e.g,t))},M0);class QS{constructor(t,n){var i=Yn;this.g=t,this.h=n,this.m=re,this.j=Nt,this.defaultValue=void 0,this.l=i.Oa!=null?Xm:void 0}register(){Al(this)}}function Fi(e,t){return new QS(e,t)}function ys(e,t){return(n,i)=>{{const r={ea:!0};i&&Object.assign(r,i),n=d0(n,void 0,void 0,r);try{const a=new e,o=a.v;$u(t)(o,n);var s=a}finally{p0(n)}}return s}}function Hl(e){return function(){const t=new class{constructor(){this.l=[],this.h=0,this.g=new class{constructor(){this.g=[]}length(){return this.g.length}end(){const a=this.g;return this.g=[],a}}}};w0(this.v,t,tr(kl,Gl,Vl,e)),qr(t,t.g.end());const n=new Uint8Array(t.h),i=t.l,s=i.length;let r=0;for(let a=0;a<s;a++){const o=i[a];n.set(o,r),r+=o.length}return t.l=[n],n}}var rp=class extends wt{constructor(e){super(e)}},ap=[0,ps,xn(function(e,t,n){return e.h===2&&(Mn(t,n,(e=g0(e))===Ks()?void 0:e),!0)},function(e,t,n){if(t!=null){if(t instanceof wt){const i=t.Ra;return void(i?(t=i(t),t!=null&&Fl(e,n,Ou(t,!0).buffer)):Vr(Nh,3))}if(Array.isArray(t))return void Vr(Nh,3)}U0(e,t,n)},x0)];let Fc,op=globalThis.trustedTypes;function lp(e){var t;return Fc===void 0&&(Fc=function(){let n=null;if(!op)return n;try{const i=s=>s;n=op.createPolicy("goog#html",{createHTML:i,createScript:i,createScriptURL:i})}catch{}return n}()),e=(t=Fc)?t.createScriptURL(e):e,new class{constructor(n){this.g=n}toString(){return this.g+""}}(e)}function Oo(e,...t){if(t.length===0)return lp(e[0]);let n=e[0];for(let i=0;i<t.length;i++)n+=encodeURIComponent(t[i])+e[i+1];return lp(n)}var B0=[0,$e,gn,Pe,-1,Qa,gn,-1,Pe],ty=class extends wt{constructor(e){super(e)}},k0=[0,Pe,me,Pe,gn,-1,ua(function(e,t,n){return(e.h===0||e.h===2)&&(t=oa(t,0|t[At],n),e.h==2?Ul(e,OS,t):t.push(xs(e.g)),!0)},function(e,t,n){if((t=ha(ia,t))!=null&&t.length){n=Vu(e,n);for(let i=0;i<t.length;i++)Nl(e.g,t[i]);Hu(e,n)}},M0),me,-1,[0,Pe,-1],gn,Pe,-1],z0=[0,3,Pe,-1,2,[0,[2],$e,Ee,[0,xn(function(e,t,n){return e.h===0&&(Mn(t,n,Di(e.g)),!0)},N0,qu)]],[0,gn,Pe,gn,Pe,gn,Pe,me,-1],[0,[3,4],me,-1,Ee,[0,$e],Ee,[0,gn]],[0]],G0=[0,me,-2],cp=class extends wt{constructor(e){super(e)}},V0=[0],H0=[0,$e,Pe,1,Pe,-4],Yn=class extends wt{constructor(e){super(e,2)}},je={};je[336783863]=[0,me,Pe,-1,$e,[0,[1,2,3,4,5,6,7,8,9],Ee,V0,Ee,k0,Ee,G0,Ee,H0,Ee,B0,Ee,[0,me,-2],Ee,[0,me,gn],Ee,z0,Ee,[0,gn,-1,Pe]],[0,me],Pe,[0,[1,3],[2,4],Ee,[0,Qa],-1,Ee,[0,dn],-1,an,[0,me,-1]],me];var hp=[0,Nc,-1,Ws,-3,Nc,Qa,ps,wr,Nc,-1,Ws,wr,Ws,-2,ps];function be(e,t){Il(e,3,t)}function te(e,t){Il(e,4,t)}var Dn=class extends wt{constructor(e){super(e,500)}o(e){return Nt(this,0,7,e)}},Ia=[-1,{}],up=[0,me,1,Ia],fp=[0,me,dn,Ia];function ri(e,t){Fu(e,1,Dn,t)}function De(e,t){Il(e,10,t)}function oe(e,t){Il(e,15,t)}var qn=class extends wt{constructor(e){super(e,500)}o(e){return Nt(this,0,1001,e)}},W0=[-500,an,[-500,ps,-1,dn,-3,[-2,je,Pe],an,ap,wr,-1,up,fp,an,[0,ps,Ws],ps,hp,wr,dn,987,dn],4,an,[-500,me,-1,[-1,{}],998,me],an,[-500,me,dn,-1,[-2,{},Pe],997,dn,-1],wr,an,[-500,me,dn,Ia,998,dn],dn,wr,up,fp,an,[0,ps,-1,Ia],dn,-2,hp,ps,-1,Ws,[0,Ws,jS],978,Ia,an,ap];qn.prototype.g=Hl(W0);var ey=ys(qn,W0),ny=class extends wt{constructor(e){super(e)}},X0=class extends wt{constructor(e){super(e)}g(){return ji(this,ny,1)}},Y0=[0,an,[0,$e,Xe,me,-1]],Wl=ys(X0,Y0),iy=class extends wt{constructor(e){super(e)}},sy=class extends wt{constructor(e){super(e)}},Oc=class extends wt{constructor(e){super(e)}l(){return re(this,iy,2)}g(){return ji(this,sy,5)}},q0=ys(class extends wt{constructor(e){super(e)}},[0,dn,Qa,Ju,[0,gn,[0,$e,-3],[0,Xe,-3],[0,$e,-1,[0,an,[0,$e,-2]]],an,[0,Xe,-1,me,Xe]],me,-1,Ms,an,[0,$e,Xe],dn,Ms]),K0=class extends wt{constructor(e){super(e)}},Ur=ys(class extends wt{constructor(e){super(e)}},[0,an,[0,Xe,-4]]),Z0=class extends wt{constructor(e){super(e)}},to=ys(class extends wt{constructor(e){super(e)}},[0,an,[0,Xe,-4]]),ry=class extends wt{constructor(e){super(e)}},ay=[0,$e,-1,Ju,gn],$0=class extends wt{constructor(e){super(e)}};$0.prototype.g=Hl([0,Xe,-4,Ms]);var oy=class extends wt{constructor(e){super(e)}},ly=ys(class extends wt{constructor(e){super(e)}},[0,an,[0,1,$e,me,Y0],Ms]),dp=class extends wt{constructor(e){super(e)}},cy=class extends wt{constructor(e){super(e)}na(){const e=Ce(this,1,void 0,void 0,r0);return e??Ks()}},hy=class extends wt{constructor(e){super(e)}},J0=[1,2],uy=ys(class extends wt{constructor(e){super(e)}},[0,an,[0,J0,Ee,[0,Ju],Ee,[0,O0],$e,me],Ms]),ju=class extends wt{constructor(e){super(e)}},j0=[0,me,$e,Xe,dn,-1],pp=class extends wt{constructor(e){super(e)}},fy=[0,Pe,-1],mp=class extends wt{constructor(e){super(e)}},Qo=[1,2,3,4,5,6],vl=class extends wt{constructor(e){super(e)}g(){return Ce(this,1,void 0,void 0,r0)!=null}l(){return cn(Ce(this,2))!=null}},Oe=class extends wt{constructor(e){super(e)}g(){return Km(Ce(this,2))??!1}},Q0=[0,O0,me,[0,$e,Ms,-1],[0,$S,Ms]],Ye=[0,Q0,Pe,[0,Qo,Ee,H0,Ee,k0,Ee,B0,Ee,V0,Ee,G0,Ee,z0],gn],Xl=class extends wt{constructor(e){super(e)}},Qu=[0,Ye,Xe,-1,$e],dy=Fi(502141897,Xl);je[502141897]=Qu;var py=ys(class extends wt{constructor(e){super(e)}},[0,[0,gn,-1,KS,JS],ay]),tg=class extends wt{constructor(e){super(e)}},eg=class extends wt{constructor(e){super(e)}},Gh=[0,Ye,Xe,[0,Ye],Pe],my=Fi(508968150,eg);je[508968150]=[0,Ye,Qu,Gh,Xe,[0,[0,Q0]]],je[508968149]=Gh;var br=class extends wt{constructor(e){super(e)}l(){return re(this,ju,2)}g(){fe(this,2)}},ng=[0,Ye,j0];je[478825465]=ng;var gy=class extends wt{constructor(e){super(e)}},ig=class extends wt{constructor(e){super(e)}},tf=class extends wt{constructor(e){super(e)}},ef=class extends wt{constructor(e){super(e)}},sg=class extends wt{constructor(e){super(e)}},gp=[0,Ye,[0,Ye],ng,-1],rg=[0,Ye,Xe,$e],nf=[0,Ye,Xe],ag=[0,Ye,rg,nf,Xe],_y=Fi(479097054,sg);je[479097054]=[0,Ye,ag,gp],je[463370452]=gp,je[464864288]=rg;var vy=Fi(462713202,ef);je[462713202]=ag,je[474472470]=nf;var xy=class extends wt{constructor(e){super(e)}},og=class extends wt{constructor(e){super(e)}},lg=class extends wt{constructor(e){super(e)}},cg=class extends wt{constructor(e){super(e)}},sf=[0,Ye,Xe,-1,$e],Vh=[0,Ye,Xe,Pe];cg.prototype.g=Hl([0,Ye,nf,[0,Ye],Qu,Gh,sf,Vh]);var hg=class extends wt{constructor(e){super(e)}},My=Fi(456383383,hg);je[456383383]=[0,Ye,j0];var ug=class extends wt{constructor(e){super(e)}},Sy=Fi(476348187,ug);je[476348187]=[0,Ye,fy];var fg=class extends wt{constructor(e){super(e)}},_p=class extends wt{constructor(e){super(e)}},dg=[0,gn,-1],yy=Fi(458105876,class extends wt{constructor(e){super(e)}g(){let e;var t=this.v;const n=0|t[At];return e=Hn(this,n),t=function(i,s,r,a){var o=_p;!a&&ra(i)&&(r=0|(s=i.v)[At]);var l=Ji(s,2);if(i=!1,l==null){if(a)return Jd();l=[]}else if(l.constructor===$i){if(!(2&l.J)||a)return l;l=l.V()}else Array.isArray(l)?i=!!(2&(0|l[At])):l=[];if(a){if(!l.length)return Jd();i||(i=!0,Ka(l))}else i&&(i=!1,ka(l),l=a0(l));return!i&&32&r&&qa(l,32),r=Je(s,r,2,a=new $i(l,o,bS,void 0)),i||Qs(s,r),a}(this,t,n,e),!e&&_p&&(t.ra=!0),t}});je[458105876]=[0,dg,qS,[!0,Ms,[0,me,-1,dn]],[0,Qa,Pe,gn]];var rf=class extends wt{constructor(e){super(e)}},pg=Fi(458105758,rf);je[458105758]=[0,Ye,me,dg];var Bc=class extends wt{constructor(e){super(e)}},vp=[0,ZS,-1,Ws],Ey=class extends wt{constructor(e){super(e)}},mg=class extends wt{constructor(e){super(e)}},Hh=[1,2];mg.prototype.g=Hl([0,Hh,Ee,vp,Ee,[0,an,vp]]);var gg=class extends wt{constructor(e){super(e)}},by=Fi(443442058,gg);je[443442058]=[0,Ye,me,$e,Xe,dn,-1,Pe,Xe],je[514774813]=sf;var _g=class extends wt{constructor(e){super(e)}},Ty=Fi(516587230,_g);function Wh(e,t){return t=t?t.clone():new ju,e.displayNamesLocale!==void 0?fe(t,1,Ja(e.displayNamesLocale)):e.displayNamesLocale===void 0&&fe(t,1),e.maxResults!==void 0?Qi(t,2,e.maxResults):"maxResults"in e&&fe(t,2),e.scoreThreshold!==void 0?Dt(t,3,e.scoreThreshold):"scoreThreshold"in e&&fe(t,3),e.categoryAllowlist!==void 0?pl(t,4,e.categoryAllowlist):"categoryAllowlist"in e&&fe(t,4),e.categoryDenylist!==void 0?pl(t,5,e.categoryDenylist):"categoryDenylist"in e&&fe(t,5),t}function vg(e){const t=Number(e);return Number.isSafeInteger(t)?t:String(e)}function af(e,t=-1,n=""){return{categories:e.map(i=>({index:ii(i,1)??0??-1,score:Ge(i,2)??0,categoryName:cn(Ce(i,3))??""??"",displayName:cn(Ce(i,4))??""??""})),headIndex:t,headName:n}}function Ay(e){const t={classifications:ji(e,oy,1).map(n=>{var i;return af(((i=re(n,X0,4))==null?void 0:i.g())??[],ii(n,2)??0,cn(Ce(n,3))??"")})};return function(n){return n==null?n:typeof n=="bigint"?(Fh(n)?n=Number(n):(n=Za(64,n),n=Fh(n)?Number(n):String(n)),n):$a(n)?typeof n=="number"?Au(n):Jm(n):void 0}(Ce(e,2,void 0,void 0,fl))!=null&&(t.timestampMs=vg(Ce(e,2,void 0,void 0,fl)??i0)),t}function xg(e){var a,o;var t=ks(e,3,wi,Bs()),n=ks(e,2,ia,Bs()),i=ks(e,1,cn,Bs()),s=ks(e,9,cn,Bs());const r={categories:[],keypoints:[]};for(let l=0;l<t.length;l++)r.categories.push({score:t[l],index:n[l]??-1,categoryName:i[l]??"",displayName:s[l]??""});if((t=(a=re(e,Oc,4))==null?void 0:a.l())&&(r.boundingBox={originX:ii(t,1,cs)??0,originY:ii(t,2,cs)??0,width:ii(t,3,cs)??0,height:ii(t,4,cs)??0,angle:0}),(o=re(e,Oc,4))==null?void 0:o.g().length)for(const l of re(e,Oc,4).g())r.keypoints.push({x:Ce(l,1,void 0,cs,wi)??0,y:Ce(l,2,void 0,cs,wi)??0,score:Ce(l,4,void 0,cs,wi)??0,label:cn(Ce(l,3,void 0,cs))??""});return r}function Yl(e){const t=[];for(const n of ji(e,Z0,1))t.push({x:Ge(n,1)??0,y:Ge(n,2)??0,z:Ge(n,3)??0,visibility:Ge(n,4)??0});return t}function Ua(e){const t=[];for(const n of ji(e,K0,1))t.push({x:Ge(n,1)??0,y:Ge(n,2)??0,z:Ge(n,3)??0,visibility:Ge(n,4)??0});return t}function xp(e){return Array.from(e,t=>t>127?t-256:t)}function Mp(e,t){if(e.length!==t.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${e.length} vs. ${t.length}).`);let n=0,i=0,s=0;for(let r=0;r<e.length;r++)n+=e[r]*t[r],i+=e[r]*e[r],s+=t[r]*t[r];if(i<=0||s<=0)throw Error("Cannot compute cosine similarity on embedding with 0 norm.");return n/Math.sqrt(i*s)}let Bo;je[516587230]=[0,Ye,sf,Vh,Xe],je[518928384]=Vh;const wy=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);async function Mg(e){if(e)return!0;if(Bo===void 0)try{await WebAssembly.instantiate(wy),Bo=!0}catch{Bo=!1}return Bo}async function ko(e,t,n){return{wasmLoaderPath:`${t}/${e}_${n=`wasm${n?"_module":""}${await Mg(n)?"":"_nosimd"}_internal`}.js`,wasmBinaryPath:`${t}/${e}_${n}.wasm`}}var Tr=class{};function Sg(){var e=navigator;return typeof OffscreenCanvas<"u"&&(!function(t=navigator){return(t=t.userAgent).includes("Safari")&&!t.includes("Chrome")}(e)||!!((e=e.userAgent.match(/Version\/([\d]+).*Safari/))&&e.length>=1&&Number(e[1])>=17))}async function Sp(e){if(typeof importScripts!="function"){const t=document.createElement("script");return t.src=e.toString(),t.crossOrigin="anonymous",new Promise((n,i)=>{t.addEventListener("load",()=>{n()},!1),t.addEventListener("error",s=>{i(s)},!1),document.body.appendChild(t)})}try{importScripts(e.toString())}catch(t){if(!(t instanceof TypeError))throw t;{const n=self.import;n?await n(e.toString()):await import(e.toString())}}}function yg(e){return e.videoWidth!==void 0?[e.videoWidth,e.videoHeight]:e.naturalWidth!==void 0?[e.naturalWidth,e.naturalHeight]:e.displayWidth!==void 0?[e.displayWidth,e.displayHeight]:[e.width,e.height]}function Ct(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),n(t=e.i.stringToNewUTF8(t)),e.i._free(t)}function yp(e,t,n){if(!e.i.canvas)throw Error("No OpenGL canvas configured.");if(n?e.i._bindTextureToStream(n):e.i._bindTextureToCanvas(),!(n=e.i.canvas.getContext("webgl2")||e.i.canvas.getContext("webgl")))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,t),e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);const[i,s]=yg(t);return!e.l||i===e.i.canvas.width&&s===e.i.canvas.height||(e.i.canvas.width=i,e.i.canvas.height=s),[i,s]}function Ep(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");const i=new Uint32Array(t.length);for(let s=0;s<t.length;s++)i[s]=e.i.stringToNewUTF8(t[s]);t=e.i._malloc(4*i.length),e.i.HEAPU32.set(i,t>>2),n(t);for(const s of i)e.i._free(s);e.i._free(t)}function Si(e,t,n){e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=n}function hs(e,t,n){let i=[];e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=(s,r,a)=>{r?(n(i,a),i=[]):i.push(s)}}Tr.forVisionTasks=function(e,t=!1){return ko("vision",e??Oo``,t)},Tr.forTextTasks=function(e,t=!1){return ko("text",e??Oo``,t)},Tr.forGenAiTasks=function(e,t=!1){return ko("genai",e??Oo``,t)},Tr.forAudioTasks=function(e,t=!1){return ko("audio",e??Oo``,t)},Tr.isSimdSupported=function(e=!1){return Mg(e)};async function Ry(e,t,n,i){return e=await(async(s,r,a,o,l)=>{if(r&&await Sp(r),!self.ModuleFactory||a&&(await Sp(a),!self.ModuleFactory))throw Error("ModuleFactory not set.");return self.Module&&l&&((r=self.Module).locateFile=l.locateFile,l.mainScriptUrlOrBlob&&(r.mainScriptUrlOrBlob=l.mainScriptUrlOrBlob)),l=await self.ModuleFactory(self.Module||l),self.ModuleFactory=self.Module=void 0,new s(l,o)})(e,n.wasmLoaderPath,n.assetLoaderPath,t,{locateFile:s=>s.endsWith(".wasm")?n.wasmBinaryPath.toString():n.assetBinaryPath&&s.endsWith(".data")?n.assetBinaryPath.toString():s}),await e.o(i),e}function kc(e,t){const n=re(e.baseOptions,vl,1)||new vl;typeof t=="string"?(fe(n,2,Ja(t)),fe(n,1)):t instanceof Uint8Array&&(fe(n,1,yu(t,!1)),fe(n,2)),Nt(e.baseOptions,0,1,n)}function bp(e){try{const t=e.H.length;if(t===1)throw Error(e.H[0].message);if(t>1)throw Error("Encountered multiple errors: "+e.H.map(n=>n.message).join(", "))}finally{e.H=[]}}function Et(e,t){e.C=Math.max(e.C,t)}function ql(e,t){e.B=new Dn,Wn(e.B,2,"PassThroughCalculator"),be(e.B,"free_memory"),te(e.B,"free_memory_unused_out"),De(t,"free_memory"),ri(t,e.B)}function Kr(e,t){be(e.B,t),te(e.B,t+"_unused_out")}function Kl(e){e.g.addBoolToStream(!0,"free_memory",e.C)}var Xh=class{constructor(e){this.g=e,this.H=[],this.C=0,this.g.setAutoRenderToScreen(!1)}l(e,t=!0){var n,i,s,r,a,o;if(t){const l=e.baseOptions||{};if((n=e.baseOptions)!=null&&n.modelAssetBuffer&&((i=e.baseOptions)!=null&&i.modelAssetPath))throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");if(!((s=re(this.baseOptions,vl,1))!=null&&s.g()||(r=re(this.baseOptions,vl,1))!=null&&r.l()||(a=e.baseOptions)!=null&&a.modelAssetBuffer||(o=e.baseOptions)!=null&&o.modelAssetPath))throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");if(function(c,u){let f=re(c.baseOptions,mp,3);if(!f){var h=f=new mp,p=new cp;Da(h,4,Qo,p)}"delegate"in u&&(u.delegate==="GPU"?(u=f,h=new ty,Da(u,2,Qo,h)):(u=f,h=new cp,Da(u,4,Qo,h))),Nt(c.baseOptions,0,3,f)}(this,l),l.modelAssetPath)return fetch(l.modelAssetPath.toString()).then(c=>{if(c.ok)return c.arrayBuffer();throw Error(`Failed to fetch model: ${l.modelAssetPath} (${c.status})`)}).then(c=>{try{this.g.i.FS_unlink("/model.dat")}catch{}this.g.i.FS_createDataFile("/","model.dat",new Uint8Array(c),!0,!1,!1),kc(this,"/model.dat"),this.m(),this.L()});if(l.modelAssetBuffer instanceof Uint8Array)kc(this,l.modelAssetBuffer);else if(l.modelAssetBuffer)return async function(c){const u=[];for(var f=0;;){const{done:h,value:p}=await c.read();if(h)break;u.push(p),f+=p.length}if(u.length===0)return new Uint8Array(0);if(u.length===1)return u[0];c=new Uint8Array(f),f=0;for(const h of u)c.set(h,f),f+=h.length;return c}(l.modelAssetBuffer).then(c=>{kc(this,c),this.m(),this.L()})}return this.m(),this.L(),Promise.resolve()}L(){}ca(){let e;if(this.g.ca(t=>{e=ey(t)}),!e)throw Error("Failed to retrieve CalculatorGraphConfig");return e}setGraph(e,t){this.g.attachErrorListener((n,i)=>{this.H.push(Error(i))}),this.g.Ja(),this.g.setGraph(e,t),this.B=void 0,bp(this)}finishProcessing(){this.g.finishProcessing(),bp(this)}close(){this.B=void 0,this.g.closeGraph()}};function gs(e,t){if(!e)throw Error(`Unable to obtain required WebGL resource: ${t}`);return e}Xh.prototype.close=Xh.prototype.close;class Cy{constructor(t,n,i,s){this.g=t,this.h=n,this.m=i,this.l=s}bind(){this.g.bindVertexArray(this.h)}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.l)}}function Tp(e,t,n){const i=e.g;if(n=gs(i.createShader(n),"Failed to create WebGL shader"),i.shaderSource(n,t),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${i.getShaderInfoLog(n)}`);return i.attachShader(e.h,n),n}function Ap(e,t){const n=e.g,i=gs(n.createVertexArray(),"Failed to create vertex array");n.bindVertexArray(i);const s=gs(n.createBuffer(),"Failed to create buffer");n.bindBuffer(n.ARRAY_BUFFER,s),n.enableVertexAttribArray(e.O),n.vertexAttribPointer(e.O,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);const r=gs(n.createBuffer(),"Failed to create buffer");return n.bindBuffer(n.ARRAY_BUFFER,r),n.enableVertexAttribArray(e.L),n.vertexAttribPointer(e.L,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(t?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new Cy(n,i,s,r)}function of(e,t){if(e.g){if(t!==e.g)throw Error("Cannot change GL context once initialized")}else e.g=t}function Py(e,t,n,i){return of(e,t),e.h||(e.m(),e.D()),n?(e.u||(e.u=Ap(e,!0)),n=e.u):(e.A||(e.A=Ap(e,!1)),n=e.A),t.useProgram(e.h),n.bind(),e.l(),e=i(),n.g.bindVertexArray(null),e}function Eg(e,t,n){return of(e,t),e=gs(t.createTexture(),"Failed to create texture"),t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n??t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n??t.LINEAR),t.bindTexture(t.TEXTURE_2D,null),e}function bg(e,t,n){of(e,t),e.B||(e.B=gs(t.createFramebuffer(),"Failed to create framebuffe.")),t.bindFramebuffer(t.FRAMEBUFFER,e.B),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0)}function Ly(e){var t;(t=e.g)==null||t.bindFramebuffer(e.g.FRAMEBUFFER,null)}var Tg=class{H(){return`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `}m(){const e=this.g;if(this.h=gs(e.createProgram(),"Failed to create WebGL program"),this.X=Tp(this,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,e.VERTEX_SHADER),this.W=Tp(this,this.H(),e.FRAGMENT_SHADER),e.linkProgram(this.h),!e.getProgramParameter(this.h,e.LINK_STATUS))throw Error(`Error during program linking: ${e.getProgramInfoLog(this.h)}`);this.O=e.getAttribLocation(this.h,"aVertex"),this.L=e.getAttribLocation(this.h,"aTex")}D(){}l(){}close(){if(this.h){const e=this.g;e.deleteProgram(this.h),e.deleteShader(this.X),e.deleteShader(this.W)}this.B&&this.g.deleteFramebuffer(this.B),this.A&&this.A.close(),this.u&&this.u.close()}};function Wi(e,t){switch(t){case 0:return e.g.find(n=>n instanceof Uint8Array);case 1:return e.g.find(n=>n instanceof Float32Array);case 2:return e.g.find(n=>typeof WebGLTexture<"u"&&n instanceof WebGLTexture);default:throw Error(`Type is not supported: ${t}`)}}function Yh(e){var t=Wi(e,1);if(!t){if(t=Wi(e,0))t=new Float32Array(t).map(i=>i/255);else{t=new Float32Array(e.width*e.height);const i=Zr(e);var n=lf(e);if(bg(n,i,Ag(e)),"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"document"in self&&"ontouchend"in self.document){n=new Float32Array(e.width*e.height*4),i.readPixels(0,0,e.width,e.height,i.RGBA,i.FLOAT,n);for(let s=0,r=0;s<t.length;++s,r+=4)t[s]=n[r]}else i.readPixels(0,0,e.width,e.height,i.RED,i.FLOAT,t)}e.g.push(t)}return t}function Ag(e){let t=Wi(e,2);if(!t){const n=Zr(e);t=Rg(e);const i=Yh(e),s=wg(e);n.texImage2D(n.TEXTURE_2D,0,s,e.width,e.height,0,n.RED,n.FLOAT,i),qh(e)}return t}function Zr(e){if(!e.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return e.h||(e.h=gs(e.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),e.h}function wg(e){if(e=Zr(e),!zo)if(e.getExtension("EXT_color_buffer_float")&&e.getExtension("OES_texture_float_linear")&&e.getExtension("EXT_float_blend"))zo=e.R32F;else{if(!e.getExtension("EXT_color_buffer_half_float"))throw Error("GPU does not fully support 4-channel float32 or float16 formats");zo=e.R16F}return zo}function lf(e){return e.l||(e.l=new Tg),e.l}function Rg(e){const t=Zr(e);t.viewport(0,0,e.width,e.height),t.activeTexture(t.TEXTURE0);let n=Wi(e,2);return n||(n=Eg(lf(e),t,e.m?t.LINEAR:t.NEAREST),e.g.push(n),e.j=!0),t.bindTexture(t.TEXTURE_2D,n),n}function qh(e){e.h.bindTexture(e.h.TEXTURE_2D,null)}var zo,rn=class{constructor(e,t,n,i,s,r,a){this.g=e,this.m=t,this.j=n,this.canvas=i,this.l=s,this.width=r,this.height=a,this.j&&--wp===0&&console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.")}Fa(){return!!Wi(this,0)}ka(){return!!Wi(this,1)}R(){return!!Wi(this,2)}ja(){return(t=Wi(e=this,0))||(t=Yh(e),t=new Uint8Array(t.map(n=>Math.round(255*n))),e.g.push(t)),t;var e,t}ia(){return Yh(this)}N(){return Ag(this)}clone(){const e=[];for(const t of this.g){let n;if(t instanceof Uint8Array)n=new Uint8Array(t);else if(t instanceof Float32Array)n=new Float32Array(t);else{if(!(t instanceof WebGLTexture))throw Error(`Type is not supported: ${t}`);{const i=Zr(this),s=lf(this);i.activeTexture(i.TEXTURE1),n=Eg(s,i,this.m?i.LINEAR:i.NEAREST),i.bindTexture(i.TEXTURE_2D,n);const r=wg(this);i.texImage2D(i.TEXTURE_2D,0,r,this.width,this.height,0,i.RED,i.FLOAT,null),i.bindTexture(i.TEXTURE_2D,null),bg(s,i,n),Py(s,i,!1,()=>{Rg(this),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),qh(this)}),Ly(s),qh(this)}}e.push(n)}return new rn(e,this.m,this.R(),this.canvas,this.l,this.width,this.height)}close(){this.j&&Zr(this).deleteTexture(Wi(this,2)),wp=-1}};rn.prototype.close=rn.prototype.close,rn.prototype.clone=rn.prototype.clone,rn.prototype.getAsWebGLTexture=rn.prototype.N,rn.prototype.getAsFloat32Array=rn.prototype.ia,rn.prototype.getAsUint8Array=rn.prototype.ja,rn.prototype.hasWebGLTexture=rn.prototype.R,rn.prototype.hasFloat32Array=rn.prototype.ka,rn.prototype.hasUint8Array=rn.prototype.Fa;var wp=250;function di(...e){return e.map(([t,n])=>({start:t,end:n}))}const Dy=function(e){return class extends e{Ja(){this.i._registerModelResourcesGraphService()}}}((Rp=class{constructor(e,t){this.l=!0,this.i=e,this.g=null,this.h=0,this.m=typeof this.i._addIntToInputStream=="function",t!==void 0?this.i.canvas=t:Sg()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),this.i.canvas=document.createElement("canvas"))}async initializeGraph(e){const t=await(await fetch(e)).arrayBuffer();e=!(e.endsWith(".pbtxt")||e.endsWith(".textproto")),this.setGraph(new Uint8Array(t),e)}setGraphFromString(e){this.setGraph(new TextEncoder().encode(e),!1)}setGraph(e,t){const n=e.length,i=this.i._malloc(n);this.i.HEAPU8.set(e,i),t?this.i._changeBinaryGraph(n,i):this.i._changeTextGraph(n,i),this.i._free(i)}configureAudio(e,t,n,i,s){this.i._configureAudio||console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),Ct(this,i||"input_audio",r=>{Ct(this,s=s||"audio_header",a=>{this.i._configureAudio(r,a,e,t??0,n)})})}setAutoResizeCanvas(e){this.l=e}setAutoRenderToScreen(e){this.i._setAutoRenderToScreen(e)}setGpuBufferVerticalFlip(e){this.i.gpuOriginForWebTexturesIsBottomLeft=e}ca(e){Si(this,"__graph_config__",t=>{e(t)}),Ct(this,"__graph_config__",t=>{this.i._getGraphConfig(t,void 0)}),delete this.i.simpleListeners.__graph_config__}attachErrorListener(e){this.i.errorListener=e}attachEmptyPacketListener(e,t){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[e]=t}addAudioToStream(e,t,n){this.addAudioToStreamWithShape(e,0,0,t,n)}addAudioToStreamWithShape(e,t,n,i,s){const r=4*e.length;this.h!==r&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(r),this.h=r),this.i.HEAPF32.set(e,this.g/4),Ct(this,i,a=>{this.i._addAudioToInputStream(this.g,t,n,a,s)})}addGpuBufferToStream(e,t,n){Ct(this,t,i=>{const[s,r]=yp(this,e,i);this.i._addBoundTextureToStream(i,s,r,n)})}addBoolToStream(e,t,n){Ct(this,t,i=>{this.i._addBoolToInputStream(e,i,n)})}addDoubleToStream(e,t,n){Ct(this,t,i=>{this.i._addDoubleToInputStream(e,i,n)})}addFloatToStream(e,t,n){Ct(this,t,i=>{this.i._addFloatToInputStream(e,i,n)})}addIntToStream(e,t,n){Ct(this,t,i=>{this.i._addIntToInputStream(e,i,n)})}addUintToStream(e,t,n){Ct(this,t,i=>{this.i._addUintToInputStream(e,i,n)})}addStringToStream(e,t,n){Ct(this,t,i=>{Ct(this,e,s=>{this.i._addStringToInputStream(s,i,n)})})}addStringRecordToStream(e,t,n){Ct(this,t,i=>{Ep(this,Object.keys(e),s=>{Ep(this,Object.values(e),r=>{this.i._addFlatHashMapToInputStream(s,r,Object.keys(e).length,i,n)})})})}addProtoToStream(e,t,n,i){Ct(this,n,s=>{Ct(this,t,r=>{const a=this.i._malloc(e.length);this.i.HEAPU8.set(e,a),this.i._addProtoToInputStream(a,e.length,r,s,i),this.i._free(a)})})}addEmptyPacketToStream(e,t){Ct(this,e,n=>{this.i._addEmptyPacketToInputStream(n,t)})}addBoolVectorToStream(e,t,n){Ct(this,t,i=>{const s=this.i._allocateBoolVector(e.length);if(!s)throw Error("Unable to allocate new bool vector on heap.");for(const r of e)this.i._addBoolVectorEntry(s,r);this.i._addBoolVectorToInputStream(s,i,n)})}addDoubleVectorToStream(e,t,n){Ct(this,t,i=>{const s=this.i._allocateDoubleVector(e.length);if(!s)throw Error("Unable to allocate new double vector on heap.");for(const r of e)this.i._addDoubleVectorEntry(s,r);this.i._addDoubleVectorToInputStream(s,i,n)})}addFloatVectorToStream(e,t,n){Ct(this,t,i=>{const s=this.i._allocateFloatVector(e.length);if(!s)throw Error("Unable to allocate new float vector on heap.");for(const r of e)this.i._addFloatVectorEntry(s,r);this.i._addFloatVectorToInputStream(s,i,n)})}addIntVectorToStream(e,t,n){Ct(this,t,i=>{const s=this.i._allocateIntVector(e.length);if(!s)throw Error("Unable to allocate new int vector on heap.");for(const r of e)this.i._addIntVectorEntry(s,r);this.i._addIntVectorToInputStream(s,i,n)})}addUintVectorToStream(e,t,n){Ct(this,t,i=>{const s=this.i._allocateUintVector(e.length);if(!s)throw Error("Unable to allocate new unsigned int vector on heap.");for(const r of e)this.i._addUintVectorEntry(s,r);this.i._addUintVectorToInputStream(s,i,n)})}addStringVectorToStream(e,t,n){Ct(this,t,i=>{const s=this.i._allocateStringVector(e.length);if(!s)throw Error("Unable to allocate new string vector on heap.");for(const r of e)Ct(this,r,a=>{this.i._addStringVectorEntry(s,a)});this.i._addStringVectorToInputStream(s,i,n)})}addBoolToInputSidePacket(e,t){Ct(this,t,n=>{this.i._addBoolToInputSidePacket(e,n)})}addDoubleToInputSidePacket(e,t){Ct(this,t,n=>{this.i._addDoubleToInputSidePacket(e,n)})}addFloatToInputSidePacket(e,t){Ct(this,t,n=>{this.i._addFloatToInputSidePacket(e,n)})}addIntToInputSidePacket(e,t){Ct(this,t,n=>{this.i._addIntToInputSidePacket(e,n)})}addUintToInputSidePacket(e,t){Ct(this,t,n=>{this.i._addUintToInputSidePacket(e,n)})}addStringToInputSidePacket(e,t){Ct(this,t,n=>{Ct(this,e,i=>{this.i._addStringToInputSidePacket(i,n)})})}addProtoToInputSidePacket(e,t,n){Ct(this,n,i=>{Ct(this,t,s=>{const r=this.i._malloc(e.length);this.i.HEAPU8.set(e,r),this.i._addProtoToInputSidePacket(r,e.length,s,i),this.i._free(r)})})}addBoolVectorToInputSidePacket(e,t){Ct(this,t,n=>{const i=this.i._allocateBoolVector(e.length);if(!i)throw Error("Unable to allocate new bool vector on heap.");for(const s of e)this.i._addBoolVectorEntry(i,s);this.i._addBoolVectorToInputSidePacket(i,n)})}addDoubleVectorToInputSidePacket(e,t){Ct(this,t,n=>{const i=this.i._allocateDoubleVector(e.length);if(!i)throw Error("Unable to allocate new double vector on heap.");for(const s of e)this.i._addDoubleVectorEntry(i,s);this.i._addDoubleVectorToInputSidePacket(i,n)})}addFloatVectorToInputSidePacket(e,t){Ct(this,t,n=>{const i=this.i._allocateFloatVector(e.length);if(!i)throw Error("Unable to allocate new float vector on heap.");for(const s of e)this.i._addFloatVectorEntry(i,s);this.i._addFloatVectorToInputSidePacket(i,n)})}addIntVectorToInputSidePacket(e,t){Ct(this,t,n=>{const i=this.i._allocateIntVector(e.length);if(!i)throw Error("Unable to allocate new int vector on heap.");for(const s of e)this.i._addIntVectorEntry(i,s);this.i._addIntVectorToInputSidePacket(i,n)})}addUintVectorToInputSidePacket(e,t){Ct(this,t,n=>{const i=this.i._allocateUintVector(e.length);if(!i)throw Error("Unable to allocate new unsigned int vector on heap.");for(const s of e)this.i._addUintVectorEntry(i,s);this.i._addUintVectorToInputSidePacket(i,n)})}addStringVectorToInputSidePacket(e,t){Ct(this,t,n=>{const i=this.i._allocateStringVector(e.length);if(!i)throw Error("Unable to allocate new string vector on heap.");for(const s of e)Ct(this,s,r=>{this.i._addStringVectorEntry(i,r)});this.i._addStringVectorToInputSidePacket(i,n)})}attachBoolListener(e,t){Si(this,e,t),Ct(this,e,n=>{this.i._attachBoolListener(n)})}attachBoolVectorListener(e,t){hs(this,e,t),Ct(this,e,n=>{this.i._attachBoolVectorListener(n)})}attachIntListener(e,t){Si(this,e,t),Ct(this,e,n=>{this.i._attachIntListener(n)})}attachIntVectorListener(e,t){hs(this,e,t),Ct(this,e,n=>{this.i._attachIntVectorListener(n)})}attachUintListener(e,t){Si(this,e,t),Ct(this,e,n=>{this.i._attachUintListener(n)})}attachUintVectorListener(e,t){hs(this,e,t),Ct(this,e,n=>{this.i._attachUintVectorListener(n)})}attachDoubleListener(e,t){Si(this,e,t),Ct(this,e,n=>{this.i._attachDoubleListener(n)})}attachDoubleVectorListener(e,t){hs(this,e,t),Ct(this,e,n=>{this.i._attachDoubleVectorListener(n)})}attachFloatListener(e,t){Si(this,e,t),Ct(this,e,n=>{this.i._attachFloatListener(n)})}attachFloatVectorListener(e,t){hs(this,e,t),Ct(this,e,n=>{this.i._attachFloatVectorListener(n)})}attachStringListener(e,t){Si(this,e,t),Ct(this,e,n=>{this.i._attachStringListener(n)})}attachStringVectorListener(e,t){hs(this,e,t),Ct(this,e,n=>{this.i._attachStringVectorListener(n)})}attachProtoListener(e,t,n){Si(this,e,t),Ct(this,e,i=>{this.i._attachProtoListener(i,n||!1)})}attachProtoVectorListener(e,t,n){hs(this,e,t),Ct(this,e,i=>{this.i._attachProtoVectorListener(i,n||!1)})}attachAudioListener(e,t,n){this.i._attachAudioListener||console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),Si(this,e,(i,s)=>{i=new Float32Array(i.buffer,i.byteOffset,i.length/4),t(i,s)}),Ct(this,e,i=>{this.i._attachAudioListener(i,n||!1)})}finishProcessing(){this.i._waitUntilIdle()}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0}},class extends Rp{get ga(){return this.i}pa(e,t,n){Ct(this,t,i=>{const[s,r]=yp(this,e,i);this.ga._addBoundTextureAsImageToStream(i,s,r,n)})}Z(e,t){Si(this,e,t),Ct(this,e,n=>{this.ga._attachImageListener(n)})}aa(e,t){hs(this,e,t),Ct(this,e,n=>{this.ga._attachImageVectorListener(n)})}}));var Rp,pi=class extends Dy{};async function se(e,t,n){return async function(i,s,r,a){return Ry(i,s,r,a)}(e,n.canvas??(Sg()?void 0:document.createElement("canvas")),t,n)}function Cg(e,t,n,i){if(e.U){const r=new $0;if(n!=null&&n.regionOfInterest){if(!e.oa)throw Error("This task doesn't support region-of-interest.");var s=n.regionOfInterest;if(s.left>=s.right||s.top>=s.bottom)throw Error("Expected RectF with left < right and top < bottom.");if(s.left<0||s.top<0||s.right>1||s.bottom>1)throw Error("Expected RectF values to be in [0,1].");Dt(r,1,(s.left+s.right)/2),Dt(r,2,(s.top+s.bottom)/2),Dt(r,4,s.right-s.left),Dt(r,3,s.bottom-s.top)}else Dt(r,1,.5),Dt(r,2,.5),Dt(r,4,1),Dt(r,3,1);if(n!=null&&n.rotationDegrees){if((n==null?void 0:n.rotationDegrees)%90!=0)throw Error("Expected rotation to be a multiple of 90°.");if(Dt(r,5,-Math.PI*n.rotationDegrees/180),(n==null?void 0:n.rotationDegrees)%180!=0){const[a,o]=yg(t);n=Ge(r,3)*o/a,s=Ge(r,4)*a/o,Dt(r,4,n),Dt(r,3,s)}}e.g.addProtoToStream(r.g(),"mediapipe.NormalizedRect",e.U,i)}e.g.pa(t,e.X,i??performance.now()),e.finishProcessing()}function mi(e,t,n){var i;if((i=e.baseOptions)!=null&&i.g())throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");Cg(e,t,n,e.C+1)}function Oi(e,t,n,i){var s;if(!((s=e.baseOptions)!=null&&s.g()))throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");Cg(e,t,n,i)}function $r(e,t,n,i){var s=t.data;const r=t.width,a=r*(t=t.height);if((s instanceof Uint8Array||s instanceof Float32Array)&&s.length!==a)throw Error("Unsupported channel count: "+s.length/a);return e=new rn([s],n,!1,e.g.i.canvas,e.P,r,t),i?e.clone():e}var Xn=class extends Xh{constructor(e,t,n,i){super(e),this.g=e,this.X=t,this.U=n,this.oa=i,this.P=new Tg}l(e,t=!0){if("runningMode"in e&&fe(this.baseOptions,2,Ga(!!e.runningMode&&e.runningMode!=="IMAGE")),e.canvas!==void 0&&this.g.i.canvas!==e.canvas)throw Error("You must create a new task to reset the canvas.");return super.l(e,t)}close(){this.P.close(),super.close()}};Xn.prototype.close=Xn.prototype.close;var Jn=class extends Xn{constructor(e,t){super(new pi(e,t),"image_in","norm_rect_in",!1),this.j={detections:[]},Nt(e=this.h=new Xl,0,1,t=new Oe),Dt(this.h,2,.5),Dt(this.h,3,.3)}get baseOptions(){return re(this.h,Oe,1)}set baseOptions(e){Nt(this.h,0,1,e)}o(e){return"minDetectionConfidence"in e&&Dt(this.h,2,e.minDetectionConfidence??.5),"minSuppressionThreshold"in e&&Dt(this.h,3,e.minSuppressionThreshold??.3),this.l(e)}F(e,t){return this.j={detections:[]},mi(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},Oi(this,e,n,t),this.j}m(){var e=new qn;De(e,"image_in"),De(e,"norm_rect_in"),oe(e,"detections");const t=new Yn;Ni(t,dy,this.h);const n=new Dn;Wn(n,2,"mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),be(n,"IMAGE:image_in"),be(n,"NORM_RECT:norm_rect_in"),te(n,"DETECTIONS:detections"),n.o(t),ri(e,n),this.g.attachProtoVectorListener("detections",(i,s)=>{for(const r of i)i=q0(r),this.j.detections.push(xg(i));Et(this,s)}),this.g.attachEmptyPacketListener("detections",i=>{Et(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Jn.prototype.detectForVideo=Jn.prototype.G,Jn.prototype.detect=Jn.prototype.F,Jn.prototype.setOptions=Jn.prototype.o,Jn.createFromModelPath=async function(e,t){return se(Jn,e,{baseOptions:{modelAssetPath:t}})},Jn.createFromModelBuffer=function(e,t){return se(Jn,e,{baseOptions:{modelAssetBuffer:t}})},Jn.createFromOptions=function(e,t){return se(Jn,e,t)};var cf=di([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),hf=di([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),uf=di([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),Pg=di([474,475],[475,476],[476,477],[477,474]),ff=di([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),df=di([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),Lg=di([469,470],[470,471],[471,472],[472,469]),pf=di([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),Dg=[...cf,...hf,...uf,...ff,...df,...pf],Ig=di([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function Cp(e){e.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]}}var Ne=class extends Xn{constructor(e,t){super(new pi(e,t),"image_in","norm_rect",!1),this.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,Nt(e=this.h=new eg,0,1,t=new Oe),this.A=new tg,Nt(this.h,0,3,this.A),this.u=new Xl,Nt(this.h,0,2,this.u),Qi(this.u,4,1),Dt(this.u,2,.5),Dt(this.A,2,.5),Dt(this.h,4,.5)}get baseOptions(){return re(this.h,Oe,1)}set baseOptions(e){Nt(this.h,0,1,e)}o(e){return"numFaces"in e&&Qi(this.u,4,e.numFaces??1),"minFaceDetectionConfidence"in e&&Dt(this.u,2,e.minFaceDetectionConfidence??.5),"minTrackingConfidence"in e&&Dt(this.h,4,e.minTrackingConfidence??.5),"minFacePresenceConfidence"in e&&Dt(this.A,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"outputFacialTransformationMatrixes"in e&&(this.outputFacialTransformationMatrixes=!!e.outputFacialTransformationMatrixes),this.l(e)}F(e,t){return Cp(this),mi(this,e,t),this.j}G(e,t,n){return Cp(this),Oi(this,e,n,t),this.j}m(){var e=new qn;De(e,"image_in"),De(e,"norm_rect"),oe(e,"face_landmarks");const t=new Yn;Ni(t,my,this.h);const n=new Dn;Wn(n,2,"mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),be(n,"IMAGE:image_in"),be(n,"NORM_RECT:norm_rect"),te(n,"NORM_LANDMARKS:face_landmarks"),n.o(t),ri(e,n),this.g.attachProtoVectorListener("face_landmarks",(i,s)=>{for(const r of i)i=to(r),this.j.faceLandmarks.push(Yl(i));Et(this,s)}),this.g.attachEmptyPacketListener("face_landmarks",i=>{Et(this,i)}),this.outputFaceBlendshapes&&(oe(e,"blendshapes"),te(n,"BLENDSHAPES:blendshapes"),this.g.attachProtoVectorListener("blendshapes",(i,s)=>{if(this.outputFaceBlendshapes)for(const r of i)i=Wl(r),this.j.faceBlendshapes.push(af(i.g()??[]));Et(this,s)}),this.g.attachEmptyPacketListener("blendshapes",i=>{Et(this,i)})),this.outputFacialTransformationMatrixes&&(oe(e,"face_geometry"),te(n,"FACE_GEOMETRY:face_geometry"),this.g.attachProtoVectorListener("face_geometry",(i,s)=>{if(this.outputFacialTransformationMatrixes)for(const r of i)(i=re(i=py(r),ry,2))&&this.j.facialTransformationMatrixes.push({rows:ii(i,1)??0??0,columns:ii(i,2)??0??0,data:ks(i,3,wi,Bs()).slice()??[]});Et(this,s)}),this.g.attachEmptyPacketListener("face_geometry",i=>{Et(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Ne.prototype.detectForVideo=Ne.prototype.G,Ne.prototype.detect=Ne.prototype.F,Ne.prototype.setOptions=Ne.prototype.o,Ne.createFromModelPath=function(e,t){return se(Ne,e,{baseOptions:{modelAssetPath:t}})},Ne.createFromModelBuffer=function(e,t){return se(Ne,e,{baseOptions:{modelAssetBuffer:t}})},Ne.createFromOptions=function(e,t){return se(Ne,e,t)},Ne.FACE_LANDMARKS_LIPS=cf,Ne.FACE_LANDMARKS_LEFT_EYE=hf,Ne.FACE_LANDMARKS_LEFT_EYEBROW=uf,Ne.FACE_LANDMARKS_LEFT_IRIS=Pg,Ne.FACE_LANDMARKS_RIGHT_EYE=ff,Ne.FACE_LANDMARKS_RIGHT_EYEBROW=df,Ne.FACE_LANDMARKS_RIGHT_IRIS=Lg,Ne.FACE_LANDMARKS_FACE_OVAL=pf,Ne.FACE_LANDMARKS_CONTOURS=Dg,Ne.FACE_LANDMARKS_TESSELATION=Ig;var mf=di([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function Pp(e){e.gestures=[],e.landmarks=[],e.worldLandmarks=[],e.handedness=[]}function Lp(e){return e.gestures.length===0?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:e.gestures,landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handedness:e.handedness,handednesses:e.handedness}}function Dp(e,t=!0){const n=[];for(const s of e){var i=Wl(s);e=[];for(const r of i.g())i=t&&ii(r,1)!=null?ii(r,1)??0:-1,e.push({score:Ge(r,2)??0,index:i,categoryName:cn(Ce(r,3))??""??"",displayName:cn(Ce(r,4))??""??""});n.push(e)}return n}var Fn=class extends Xn{constructor(e,t){super(new pi(e,t),"image_in","norm_rect",!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Nt(e=this.j=new sg,0,1,t=new Oe),this.u=new ef,Nt(this.j,0,2,this.u),this.D=new tf,Nt(this.u,0,3,this.D),this.A=new ig,Nt(this.u,0,2,this.A),this.h=new gy,Nt(this.j,0,3,this.h),Dt(this.A,2,.5),Dt(this.u,4,.5),Dt(this.D,2,.5)}get baseOptions(){return re(this.j,Oe,1)}set baseOptions(e){Nt(this.j,0,1,e)}o(e){var s,r,a,o;if(Qi(this.A,3,e.numHands??1),"minHandDetectionConfidence"in e&&Dt(this.A,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&Dt(this.u,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&Dt(this.D,2,e.minHandPresenceConfidence??.5),e.cannedGesturesClassifierOptions){var t=new br,n=t,i=Wh(e.cannedGesturesClassifierOptions,(s=re(this.h,br,3))==null?void 0:s.l());Nt(n,0,2,i),Nt(this.h,0,3,t)}else e.cannedGesturesClassifierOptions===void 0&&((r=re(this.h,br,3))==null||r.g());return e.customGesturesClassifierOptions?(Nt(n=t=new br,0,2,i=Wh(e.customGesturesClassifierOptions,(a=re(this.h,br,4))==null?void 0:a.l())),Nt(this.h,0,4,t)):e.customGesturesClassifierOptions===void 0&&((o=re(this.h,br,4))==null||o.g()),this.l(e)}Ha(e,t){return Pp(this),mi(this,e,t),Lp(this)}Ia(e,t,n){return Pp(this),Oi(this,e,n,t),Lp(this)}m(){var e=new qn;De(e,"image_in"),De(e,"norm_rect"),oe(e,"hand_gestures"),oe(e,"hand_landmarks"),oe(e,"world_hand_landmarks"),oe(e,"handedness");const t=new Yn;Ni(t,_y,this.j);const n=new Dn;Wn(n,2,"mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),be(n,"IMAGE:image_in"),be(n,"NORM_RECT:norm_rect"),te(n,"HAND_GESTURES:hand_gestures"),te(n,"LANDMARKS:hand_landmarks"),te(n,"WORLD_LANDMARKS:world_hand_landmarks"),te(n,"HANDEDNESS:handedness"),n.o(t),ri(e,n),this.g.attachProtoVectorListener("hand_landmarks",(i,s)=>{for(const r of i){i=to(r);const a=[];for(const o of ji(i,Z0,1))a.push({x:Ge(o,1)??0,y:Ge(o,2)??0,z:Ge(o,3)??0,visibility:Ge(o,4)??0});this.landmarks.push(a)}Et(this,s)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{Et(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,s)=>{for(const r of i){i=Ur(r);const a=[];for(const o of ji(i,K0,1))a.push({x:Ge(o,1)??0,y:Ge(o,2)??0,z:Ge(o,3)??0,visibility:Ge(o,4)??0});this.worldLandmarks.push(a)}Et(this,s)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{Et(this,i)}),this.g.attachProtoVectorListener("hand_gestures",(i,s)=>{this.gestures.push(...Dp(i,!1)),Et(this,s)}),this.g.attachEmptyPacketListener("hand_gestures",i=>{Et(this,i)}),this.g.attachProtoVectorListener("handedness",(i,s)=>{this.handedness.push(...Dp(i)),Et(this,s)}),this.g.attachEmptyPacketListener("handedness",i=>{Et(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};function Ip(e){return{landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handednesses:e.handedness,handedness:e.handedness}}Fn.prototype.recognizeForVideo=Fn.prototype.Ia,Fn.prototype.recognize=Fn.prototype.Ha,Fn.prototype.setOptions=Fn.prototype.o,Fn.createFromModelPath=function(e,t){return se(Fn,e,{baseOptions:{modelAssetPath:t}})},Fn.createFromModelBuffer=function(e,t){return se(Fn,e,{baseOptions:{modelAssetBuffer:t}})},Fn.createFromOptions=function(e,t){return se(Fn,e,t)},Fn.HAND_CONNECTIONS=mf;var bn=class extends Xn{constructor(e,t){super(new pi(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Nt(e=this.h=new ef,0,1,t=new Oe),this.u=new tf,Nt(this.h,0,3,this.u),this.j=new ig,Nt(this.h,0,2,this.j),Qi(this.j,3,1),Dt(this.j,2,.5),Dt(this.u,2,.5),Dt(this.h,4,.5)}get baseOptions(){return re(this.h,Oe,1)}set baseOptions(e){Nt(this.h,0,1,e)}o(e){return"numHands"in e&&Qi(this.j,3,e.numHands??1),"minHandDetectionConfidence"in e&&Dt(this.j,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&Dt(this.h,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&Dt(this.u,2,e.minHandPresenceConfidence??.5),this.l(e)}F(e,t){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],mi(this,e,t),Ip(this)}G(e,t,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Oi(this,e,n,t),Ip(this)}m(){var e=new qn;De(e,"image_in"),De(e,"norm_rect"),oe(e,"hand_landmarks"),oe(e,"world_hand_landmarks"),oe(e,"handedness");const t=new Yn;Ni(t,vy,this.h);const n=new Dn;Wn(n,2,"mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),be(n,"IMAGE:image_in"),be(n,"NORM_RECT:norm_rect"),te(n,"LANDMARKS:hand_landmarks"),te(n,"WORLD_LANDMARKS:world_hand_landmarks"),te(n,"HANDEDNESS:handedness"),n.o(t),ri(e,n),this.g.attachProtoVectorListener("hand_landmarks",(i,s)=>{for(const r of i)i=to(r),this.landmarks.push(Yl(i));Et(this,s)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{Et(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,s)=>{for(const r of i)i=Ur(r),this.worldLandmarks.push(Ua(i));Et(this,s)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{Et(this,i)}),this.g.attachProtoVectorListener("handedness",(i,s)=>{var r=this.handedness,a=r.push;const o=[];for(const l of i){i=Wl(l);const c=[];for(const u of i.g())c.push({score:Ge(u,2)??0,index:ii(u,1)??0??-1,categoryName:cn(Ce(u,3))??""??"",displayName:cn(Ce(u,4))??""??""});o.push(c)}a.call(r,...o),Et(this,s)}),this.g.attachEmptyPacketListener("handedness",i=>{Et(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};bn.prototype.detectForVideo=bn.prototype.G,bn.prototype.detect=bn.prototype.F,bn.prototype.setOptions=bn.prototype.o,bn.createFromModelPath=function(e,t){return se(bn,e,{baseOptions:{modelAssetPath:t}})},bn.createFromModelBuffer=function(e,t){return se(bn,e,{baseOptions:{modelAssetBuffer:t}})},bn.createFromOptions=function(e,t){return se(bn,e,t)},bn.HAND_CONNECTIONS=mf;var Ug=di([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function Up(e){e.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]}}function Np(e){try{if(!e.D)return e.h;e.D(e.h)}finally{Kl(e)}}function Go(e,t){e=to(e),t.push(Yl(e))}var ye=class extends Xn{constructor(e,t){super(new pi(e,t),"input_frames_image",null,!1),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,Nt(e=this.j=new cg,0,1,t=new Oe),this.I=new tf,Nt(this.j,0,2,this.I),this.W=new xy,Nt(this.j,0,3,this.W),this.u=new Xl,Nt(this.j,0,4,this.u),this.O=new tg,Nt(this.j,0,5,this.O),this.A=new og,Nt(this.j,0,6,this.A),this.M=new lg,Nt(this.j,0,7,this.M),Dt(this.u,2,.5),Dt(this.u,3,.3),Dt(this.O,2,.5),Dt(this.A,2,.5),Dt(this.A,3,.3),Dt(this.M,2,.5),Dt(this.I,2,.5)}get baseOptions(){return re(this.j,Oe,1)}set baseOptions(e){Nt(this.j,0,1,e)}o(e){return"minFaceDetectionConfidence"in e&&Dt(this.u,2,e.minFaceDetectionConfidence??.5),"minFaceSuppressionThreshold"in e&&Dt(this.u,3,e.minFaceSuppressionThreshold??.3),"minFacePresenceConfidence"in e&&Dt(this.O,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"minPoseDetectionConfidence"in e&&Dt(this.A,2,e.minPoseDetectionConfidence??.5),"minPoseSuppressionThreshold"in e&&Dt(this.A,3,e.minPoseSuppressionThreshold??.3),"minPosePresenceConfidence"in e&&Dt(this.M,2,e.minPosePresenceConfidence??.5),"outputPoseSegmentationMasks"in e&&(this.outputPoseSegmentationMasks=!!e.outputPoseSegmentationMasks),"minHandLandmarksConfidence"in e&&Dt(this.I,2,e.minHandLandmarksConfidence??.5),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.D=typeof t=="function"?t:n,Up(this),mi(this,e,i),Np(this)}G(e,t,n,i){const s=typeof n!="function"?n:{};return this.D=typeof n=="function"?n:i,Up(this),Oi(this,e,s,t),Np(this)}m(){var e=new qn;De(e,"input_frames_image"),oe(e,"pose_landmarks"),oe(e,"pose_world_landmarks"),oe(e,"face_landmarks"),oe(e,"left_hand_landmarks"),oe(e,"left_hand_world_landmarks"),oe(e,"right_hand_landmarks"),oe(e,"right_hand_world_landmarks");const t=new Yn,n=new rp;Wn(n,1,"type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),function(s,r){if(r!=null)if(Array.isArray(r))fe(s,2,Dl(r,0,Va));else{if(!(typeof r=="string"||r instanceof Pi||Mu(r)))throw Error("invalid value in Any.value field: "+r+" expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");fs(s,2,yu(r,!1),Ks())}}(n,this.j.g());const i=new Dn;Wn(i,2,"mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),Fu(i,8,rp,n),be(i,"IMAGE:input_frames_image"),te(i,"POSE_LANDMARKS:pose_landmarks"),te(i,"POSE_WORLD_LANDMARKS:pose_world_landmarks"),te(i,"FACE_LANDMARKS:face_landmarks"),te(i,"LEFT_HAND_LANDMARKS:left_hand_landmarks"),te(i,"LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),te(i,"RIGHT_HAND_LANDMARKS:right_hand_landmarks"),te(i,"RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),i.o(t),ri(e,i),ql(this,e),this.g.attachProtoListener("pose_landmarks",(s,r)=>{Go(s,this.h.poseLandmarks),Et(this,r)}),this.g.attachEmptyPacketListener("pose_landmarks",s=>{Et(this,s)}),this.g.attachProtoListener("pose_world_landmarks",(s,r)=>{var a=this.h.poseWorldLandmarks;s=Ur(s),a.push(Ua(s)),Et(this,r)}),this.g.attachEmptyPacketListener("pose_world_landmarks",s=>{Et(this,s)}),this.outputPoseSegmentationMasks&&(te(i,"POSE_SEGMENTATION_MASK:pose_segmentation_mask"),Kr(this,"pose_segmentation_mask"),this.g.Z("pose_segmentation_mask",(s,r)=>{this.h.poseSegmentationMasks=[$r(this,s,!0,!this.D)],Et(this,r)}),this.g.attachEmptyPacketListener("pose_segmentation_mask",s=>{this.h.poseSegmentationMasks=[],Et(this,s)})),this.g.attachProtoListener("face_landmarks",(s,r)=>{Go(s,this.h.faceLandmarks),Et(this,r)}),this.g.attachEmptyPacketListener("face_landmarks",s=>{Et(this,s)}),this.outputFaceBlendshapes&&(oe(e,"extra_blendshapes"),te(i,"FACE_BLENDSHAPES:extra_blendshapes"),this.g.attachProtoListener("extra_blendshapes",(s,r)=>{var a=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(s=Wl(s),a.push(af(s.g()??[]))),Et(this,r)}),this.g.attachEmptyPacketListener("extra_blendshapes",s=>{Et(this,s)})),this.g.attachProtoListener("left_hand_landmarks",(s,r)=>{Go(s,this.h.leftHandLandmarks),Et(this,r)}),this.g.attachEmptyPacketListener("left_hand_landmarks",s=>{Et(this,s)}),this.g.attachProtoListener("left_hand_world_landmarks",(s,r)=>{var a=this.h.leftHandWorldLandmarks;s=Ur(s),a.push(Ua(s)),Et(this,r)}),this.g.attachEmptyPacketListener("left_hand_world_landmarks",s=>{Et(this,s)}),this.g.attachProtoListener("right_hand_landmarks",(s,r)=>{Go(s,this.h.rightHandLandmarks),Et(this,r)}),this.g.attachEmptyPacketListener("right_hand_landmarks",s=>{Et(this,s)}),this.g.attachProtoListener("right_hand_world_landmarks",(s,r)=>{var a=this.h.rightHandWorldLandmarks;s=Ur(s),a.push(Ua(s)),Et(this,r)}),this.g.attachEmptyPacketListener("right_hand_world_landmarks",s=>{Et(this,s)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};ye.prototype.detectForVideo=ye.prototype.G,ye.prototype.detect=ye.prototype.F,ye.prototype.setOptions=ye.prototype.o,ye.createFromModelPath=function(e,t){return se(ye,e,{baseOptions:{modelAssetPath:t}})},ye.createFromModelBuffer=function(e,t){return se(ye,e,{baseOptions:{modelAssetBuffer:t}})},ye.createFromOptions=function(e,t){return se(ye,e,t)},ye.HAND_CONNECTIONS=mf,ye.POSE_CONNECTIONS=Ug,ye.FACE_LANDMARKS_LIPS=cf,ye.FACE_LANDMARKS_LEFT_EYE=hf,ye.FACE_LANDMARKS_LEFT_EYEBROW=uf,ye.FACE_LANDMARKS_LEFT_IRIS=Pg,ye.FACE_LANDMARKS_RIGHT_EYE=ff,ye.FACE_LANDMARKS_RIGHT_EYEBROW=df,ye.FACE_LANDMARKS_RIGHT_IRIS=Lg,ye.FACE_LANDMARKS_FACE_OVAL=pf,ye.FACE_LANDMARKS_CONTOURS=Dg,ye.FACE_LANDMARKS_TESSELATION=Ig;var jn=class extends Xn{constructor(e,t){super(new pi(e,t),"input_image","norm_rect",!0),this.j={classifications:[]},Nt(e=this.h=new hg,0,1,t=new Oe)}get baseOptions(){return re(this.h,Oe,1)}set baseOptions(e){Nt(this.h,0,1,e)}o(e){return Nt(this.h,0,2,Wh(e,re(this.h,ju,2))),this.l(e)}sa(e,t){return this.j={classifications:[]},mi(this,e,t),this.j}ta(e,t,n){return this.j={classifications:[]},Oi(this,e,n,t),this.j}m(){var e=new qn;De(e,"input_image"),De(e,"norm_rect"),oe(e,"classifications");const t=new Yn;Ni(t,My,this.h);const n=new Dn;Wn(n,2,"mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),be(n,"IMAGE:input_image"),be(n,"NORM_RECT:norm_rect"),te(n,"CLASSIFICATIONS:classifications"),n.o(t),ri(e,n),this.g.attachProtoListener("classifications",(i,s)=>{this.j=Ay(ly(i)),Et(this,s)}),this.g.attachEmptyPacketListener("classifications",i=>{Et(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};jn.prototype.classifyForVideo=jn.prototype.ta,jn.prototype.classify=jn.prototype.sa,jn.prototype.setOptions=jn.prototype.o,jn.createFromModelPath=function(e,t){return se(jn,e,{baseOptions:{modelAssetPath:t}})},jn.createFromModelBuffer=function(e,t){return se(jn,e,{baseOptions:{modelAssetBuffer:t}})},jn.createFromOptions=function(e,t){return se(jn,e,t)};var On=class extends Xn{constructor(e,t){super(new pi(e,t),"image_in","norm_rect",!0),this.h=new ug,this.embeddings={embeddings:[]},Nt(e=this.h,0,1,t=new Oe)}get baseOptions(){return re(this.h,Oe,1)}set baseOptions(e){Nt(this.h,0,1,e)}o(e){var t=this.h,n=re(this.h,pp,2);return n=n?n.clone():new pp,e.l2Normalize!==void 0?fe(n,1,Ga(e.l2Normalize)):"l2Normalize"in e&&fe(n,1),e.quantize!==void 0?fe(n,2,Ga(e.quantize)):"quantize"in e&&fe(n,2),Nt(t,0,2,n),this.l(e)}za(e,t){return mi(this,e,t),this.embeddings}Aa(e,t,n){return Oi(this,e,n,t),this.embeddings}m(){var e=new qn;De(e,"image_in"),De(e,"norm_rect"),oe(e,"embeddings_out");const t=new Yn;Ni(t,Sy,this.h);const n=new Dn;Wn(n,2,"mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),be(n,"IMAGE:image_in"),be(n,"NORM_RECT:norm_rect"),te(n,"EMBEDDINGS:embeddings_out"),n.o(t),ri(e,n),this.g.attachProtoListener("embeddings_out",(i,s)=>{i=uy(i),this.embeddings=function(r){return{embeddings:ji(r,hy,1).map(a=>{var c,u;const o={headIndex:ii(a,3)??0??-1,headName:cn(Ce(a,4))??""??""};var l=a.v;return l0(l,0|l[At],dp,Uc(a,1))!==void 0?(a=ks(a=re(a,dp,Uc(a,1),void 0),1,wi,Bs()),o.floatEmbedding=a.slice()):(l=new Uint8Array(0),o.quantizedEmbedding=((u=(c=re(a,cy,Uc(a,2),void 0))==null?void 0:c.na())==null?void 0:u.h())??l),o}),timestampMs:vg(Ce(r,2,void 0,void 0,fl)??i0)}}(i),Et(this,s)}),this.g.attachEmptyPacketListener("embeddings_out",i=>{Et(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};On.cosineSimilarity=function(e,t){if(e.floatEmbedding&&t.floatEmbedding)e=Mp(e.floatEmbedding,t.floatEmbedding);else{if(!e.quantizedEmbedding||!t.quantizedEmbedding)throw Error("Cannot compute cosine similarity between quantized and float embeddings.");e=Mp(xp(e.quantizedEmbedding),xp(t.quantizedEmbedding))}return e},On.prototype.embedForVideo=On.prototype.Aa,On.prototype.embed=On.prototype.za,On.prototype.setOptions=On.prototype.o,On.createFromModelPath=function(e,t){return se(On,e,{baseOptions:{modelAssetPath:t}})},On.createFromModelBuffer=function(e,t){return se(On,e,{baseOptions:{modelAssetBuffer:t}})},On.createFromOptions=function(e,t){return se(On,e,t)};var Kh=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach(n=>{n.close()}),(t=this.categoryMask)==null||t.close()}};function Iy(e){var n,i;const t=function(s){return ji(s,Dn,1)}(e.ca()).filter(s=>(cn(Ce(s,1))??"").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));if(e.u=[],t.length>1)throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");t.length===1&&(((i=(n=re(t[0],Yn,7))==null?void 0:n.j())==null?void 0:i.g())??new Map).forEach((s,r)=>{e.u[Number(r)]=cn(Ce(s,1))??""})}function Fp(e){e.categoryMask=void 0,e.confidenceMasks=void 0,e.qualityScores=void 0}function Op(e){try{const t=new Kh(e.confidenceMasks,e.categoryMask,e.qualityScores);if(!e.j)return t;e.j(t)}finally{Kl(e)}}Kh.prototype.close=Kh.prototype.close;var An=class extends Xn{constructor(e,t){super(new pi(e,t),"image_in","norm_rect",!1),this.u=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new rf,this.A=new fg,Nt(this.h,0,3,this.A),Nt(e=this.h,0,1,t=new Oe)}get baseOptions(){return re(this.h,Oe,1)}set baseOptions(e){Nt(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?fe(this.h,2,Ja(e.displayNamesLocale)):"displayNamesLocale"in e&&fe(this.h,2),"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}L(){Iy(this)}segment(e,t,n){const i=typeof t!="function"?t:{};return this.j=typeof t=="function"?t:n,Fp(this),mi(this,e,i),Op(this)}La(e,t,n,i){const s=typeof n!="function"?n:{};return this.j=typeof n=="function"?n:i,Fp(this),Oi(this,e,s,t),Op(this)}Da(){return this.u}m(){var e=new qn;De(e,"image_in"),De(e,"norm_rect");const t=new Yn;Ni(t,pg,this.h);const n=new Dn;Wn(n,2,"mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),be(n,"IMAGE:image_in"),be(n,"NORM_RECT:norm_rect"),n.o(t),ri(e,n),ql(this,e),this.outputConfidenceMasks&&(oe(e,"confidence_masks"),te(n,"CONFIDENCE_MASKS:confidence_masks"),Kr(this,"confidence_masks"),this.g.aa("confidence_masks",(i,s)=>{this.confidenceMasks=i.map(r=>$r(this,r,!0,!this.j)),Et(this,s)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],Et(this,i)})),this.outputCategoryMask&&(oe(e,"category_mask"),te(n,"CATEGORY_MASK:category_mask"),Kr(this,"category_mask"),this.g.Z("category_mask",(i,s)=>{this.categoryMask=$r(this,i,!1,!this.j),Et(this,s)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,Et(this,i)})),oe(e,"quality_scores"),te(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,s)=>{this.qualityScores=i,Et(this,s)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,Et(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};An.prototype.getLabels=An.prototype.Da,An.prototype.segmentForVideo=An.prototype.La,An.prototype.segment=An.prototype.segment,An.prototype.setOptions=An.prototype.o,An.createFromModelPath=function(e,t){return se(An,e,{baseOptions:{modelAssetPath:t}})},An.createFromModelBuffer=function(e,t){return se(An,e,{baseOptions:{modelAssetBuffer:t}})},An.createFromOptions=function(e,t){return se(An,e,t)};var Zh=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach(n=>{n.close()}),(t=this.categoryMask)==null||t.close()}};Zh.prototype.close=Zh.prototype.close;var yi=class extends Xn{constructor(e,t){super(new pi(e,t),"image_in","norm_rect_in",!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new rf,this.u=new fg,Nt(this.h,0,3,this.u),Nt(e=this.h,0,1,t=new Oe)}get baseOptions(){return re(this.h,Oe,1)}set baseOptions(e){Nt(this.h,0,1,e)}o(e){return"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}segment(e,t,n,i){const s=typeof n!="function"?n:{};if(this.j=typeof n=="function"?n:i,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.C+1,i=new mg,t.keypoint&&t.scribble)throw Error("Cannot provide both keypoint and scribble.");if(t.keypoint){var r=new Bc;fs(r,3,Ga(!0),!1),fs(r,1,Pa(t.keypoint.x),0),fs(r,2,Pa(t.keypoint.y),0),Da(i,1,Hh,r)}else{if(!t.scribble)throw Error("Must provide either a keypoint or a scribble.");{const o=new Ey;for(r of t.scribble)fs(t=new Bc,3,Ga(!0),!1),fs(t,1,Pa(r.x),0),fs(t,2,Pa(r.y),0),Fu(o,1,Bc,t);Da(i,2,Hh,o)}}this.g.addProtoToStream(i.g(),"mediapipe.tasks.vision.interactive_segmenter.proto.RegionOfInterest","roi_in",n),mi(this,e,s);t:{try{const o=new Zh(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.j){var a=o;break t}this.j(o)}finally{Kl(this)}a=void 0}return a}m(){var e=new qn;De(e,"image_in"),De(e,"roi_in"),De(e,"norm_rect_in");const t=new Yn;Ni(t,pg,this.h);const n=new Dn;Wn(n,2,"mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraphV2"),be(n,"IMAGE:image_in"),be(n,"ROI:roi_in"),be(n,"NORM_RECT:norm_rect_in"),n.o(t),ri(e,n),ql(this,e),this.outputConfidenceMasks&&(oe(e,"confidence_masks"),te(n,"CONFIDENCE_MASKS:confidence_masks"),Kr(this,"confidence_masks"),this.g.aa("confidence_masks",(i,s)=>{this.confidenceMasks=i.map(r=>$r(this,r,!0,!this.j)),Et(this,s)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],Et(this,i)})),this.outputCategoryMask&&(oe(e,"category_mask"),te(n,"CATEGORY_MASK:category_mask"),Kr(this,"category_mask"),this.g.Z("category_mask",(i,s)=>{this.categoryMask=$r(this,i,!1,!this.j),Et(this,s)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,Et(this,i)})),oe(e,"quality_scores"),te(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,s)=>{this.qualityScores=i,Et(this,s)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,Et(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};yi.prototype.segment=yi.prototype.segment,yi.prototype.setOptions=yi.prototype.o,yi.createFromModelPath=function(e,t){return se(yi,e,{baseOptions:{modelAssetPath:t}})},yi.createFromModelBuffer=function(e,t){return se(yi,e,{baseOptions:{modelAssetBuffer:t}})},yi.createFromOptions=function(e,t){return se(yi,e,t)};var Qn=class extends Xn{constructor(e,t){super(new pi(e,t),"input_frame_gpu","norm_rect",!1),this.j={detections:[]},Nt(e=this.h=new gg,0,1,t=new Oe)}get baseOptions(){return re(this.h,Oe,1)}set baseOptions(e){Nt(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?fe(this.h,2,Ja(e.displayNamesLocale)):"displayNamesLocale"in e&&fe(this.h,2),e.maxResults!==void 0?Qi(this.h,3,e.maxResults):"maxResults"in e&&fe(this.h,3),e.scoreThreshold!==void 0?Dt(this.h,4,e.scoreThreshold):"scoreThreshold"in e&&fe(this.h,4),e.categoryAllowlist!==void 0?pl(this.h,5,e.categoryAllowlist):"categoryAllowlist"in e&&fe(this.h,5),e.categoryDenylist!==void 0?pl(this.h,6,e.categoryDenylist):"categoryDenylist"in e&&fe(this.h,6),this.l(e)}F(e,t){return this.j={detections:[]},mi(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},Oi(this,e,n,t),this.j}m(){var e=new qn;De(e,"input_frame_gpu"),De(e,"norm_rect"),oe(e,"detections");const t=new Yn;Ni(t,by,this.h);const n=new Dn;Wn(n,2,"mediapipe.tasks.vision.ObjectDetectorGraph"),be(n,"IMAGE:input_frame_gpu"),be(n,"NORM_RECT:norm_rect"),te(n,"DETECTIONS:detections"),n.o(t),ri(e,n),this.g.attachProtoVectorListener("detections",(i,s)=>{for(const r of i)i=q0(r),this.j.detections.push(xg(i));Et(this,s)}),this.g.attachEmptyPacketListener("detections",i=>{Et(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Qn.prototype.detectForVideo=Qn.prototype.G,Qn.prototype.detect=Qn.prototype.F,Qn.prototype.setOptions=Qn.prototype.o,Qn.createFromModelPath=async function(e,t){return se(Qn,e,{baseOptions:{modelAssetPath:t}})},Qn.createFromModelBuffer=function(e,t){return se(Qn,e,{baseOptions:{modelAssetBuffer:t}})},Qn.createFromOptions=function(e,t){return se(Qn,e,t)};var $h=class{constructor(e,t,n){this.landmarks=e,this.worldLandmarks=t,this.segmentationMasks=n}close(){var e;(e=this.segmentationMasks)==null||e.forEach(t=>{t.close()})}};function Bp(e){e.landmarks=[],e.worldLandmarks=[],e.segmentationMasks=void 0}function kp(e){try{const t=new $h(e.landmarks,e.worldLandmarks,e.segmentationMasks);if(!e.u)return t;e.u(t)}finally{Kl(e)}}$h.prototype.close=$h.prototype.close;var Bn=class extends Xn{constructor(e,t){super(new pi(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,Nt(e=this.h=new _g,0,1,t=new Oe),this.A=new lg,Nt(this.h,0,3,this.A),this.j=new og,Nt(this.h,0,2,this.j),Qi(this.j,4,1),Dt(this.j,2,.5),Dt(this.A,2,.5),Dt(this.h,4,.5)}get baseOptions(){return re(this.h,Oe,1)}set baseOptions(e){Nt(this.h,0,1,e)}o(e){return"numPoses"in e&&Qi(this.j,4,e.numPoses??1),"minPoseDetectionConfidence"in e&&Dt(this.j,2,e.minPoseDetectionConfidence??.5),"minTrackingConfidence"in e&&Dt(this.h,4,e.minTrackingConfidence??.5),"minPosePresenceConfidence"in e&&Dt(this.A,2,e.minPosePresenceConfidence??.5),"outputSegmentationMasks"in e&&(this.outputSegmentationMasks=e.outputSegmentationMasks??!1),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.u=typeof t=="function"?t:n,Bp(this),mi(this,e,i),kp(this)}G(e,t,n,i){const s=typeof n!="function"?n:{};return this.u=typeof n=="function"?n:i,Bp(this),Oi(this,e,s,t),kp(this)}m(){var e=new qn;De(e,"image_in"),De(e,"norm_rect"),oe(e,"normalized_landmarks"),oe(e,"world_landmarks"),oe(e,"segmentation_masks");const t=new Yn;Ni(t,Ty,this.h);const n=new Dn;Wn(n,2,"mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),be(n,"IMAGE:image_in"),be(n,"NORM_RECT:norm_rect"),te(n,"NORM_LANDMARKS:normalized_landmarks"),te(n,"WORLD_LANDMARKS:world_landmarks"),n.o(t),ri(e,n),ql(this,e),this.g.attachProtoVectorListener("normalized_landmarks",(i,s)=>{this.landmarks=[];for(const r of i)i=to(r),this.landmarks.push(Yl(i));Et(this,s)}),this.g.attachEmptyPacketListener("normalized_landmarks",i=>{this.landmarks=[],Et(this,i)}),this.g.attachProtoVectorListener("world_landmarks",(i,s)=>{this.worldLandmarks=[];for(const r of i)i=Ur(r),this.worldLandmarks.push(Ua(i));Et(this,s)}),this.g.attachEmptyPacketListener("world_landmarks",i=>{this.worldLandmarks=[],Et(this,i)}),this.outputSegmentationMasks&&(te(n,"SEGMENTATION_MASK:segmentation_masks"),Kr(this,"segmentation_masks"),this.g.aa("segmentation_masks",(i,s)=>{this.segmentationMasks=i.map(r=>$r(this,r,!0,!this.u)),Et(this,s)}),this.g.attachEmptyPacketListener("segmentation_masks",i=>{this.segmentationMasks=[],Et(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Bn.prototype.detectForVideo=Bn.prototype.G,Bn.prototype.detect=Bn.prototype.F,Bn.prototype.setOptions=Bn.prototype.o,Bn.createFromModelPath=function(e,t){return se(Bn,e,{baseOptions:{modelAssetPath:t}})},Bn.createFromModelBuffer=function(e,t){return se(Bn,e,{baseOptions:{modelAssetBuffer:t}})},Bn.createFromOptions=function(e,t){return se(Bn,e,t)},Bn.POSE_CONNECTIONS=Ug;const Uy="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm",Ny="https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",zp=0,Vo=4,Ho=8,Gp=9,Vp=.32,Fy=.45,Hp=5,Wp=.4;class Oy{constructor(t,n,i){nn(this,"video");nn(this,"overlay");nn(this,"callbacks");nn(this,"landmarker",null);nn(this,"stream",null);nn(this,"rafId",0);nn(this,"running",!1);nn(this,"lastVideoTime",-1);nn(this,"activeGlow","rgba(255,170,48,0.5)");nn(this,"activeHot","rgba(255,170,48,0.7)");nn(this,"activePinch","#ffcc66");nn(this,"handStates",new Map);nn(this,"prevMode","idle");nn(this,"prevSpinGrab",null);nn(this,"prevZoomDist",null);nn(this,"lastStatus",{hands:0,mode:"idle"});nn(this,"loop",()=>{if(!this.running||(this.rafId=requestAnimationFrame(this.loop),!this.landmarker||this.video.readyState<2)||this.video.currentTime===this.lastVideoTime)return;this.lastVideoTime=this.video.currentTime;const t=this.landmarker.detectForVideo(this.video,performance.now());this.processHands(t.landmarks,t.handedness.map(n=>{var i;return((i=n[0])==null?void 0:i.categoryName)??"?"})),this.drawOverlay(t.landmarks)});this.video=t,this.overlay=n,this.callbacks=i}setPalette(t){const{r:n,g:i,b:s}=By(t),r=a=>ky(a);this.activeGlow=`rgba(${n},${i},${s},${r(.5)})`,this.activeHot=`rgba(${n},${i},${s},${r(.7)})`,this.activePinch=`rgba(${Math.min(255,n+60)},${Math.min(255,i+60)},${Math.min(255,s+30)},1)`}async start(){this.stream=await navigator.mediaDevices.getUserMedia({video:{width:640,height:480,facingMode:"user"},audio:!1}),this.video.srcObject=this.stream,await this.video.play();const t=await Tr.forVisionTasks(Uy),n={baseOptions:{modelAssetPath:Ny,delegate:"GPU"},runningMode:"VIDEO",numHands:2,minHandDetectionConfidence:.6,minHandPresenceConfidence:.6,minTrackingConfidence:.6};try{this.landmarker=await bn.createFromOptions(t,n)}catch{this.landmarker=await bn.createFromOptions(t,{...n,baseOptions:{...n.baseOptions,delegate:"CPU"}})}this.running=!0,this.loop()}stop(){var t,n,i;this.running=!1,cancelAnimationFrame(this.rafId),(t=this.landmarker)==null||t.close(),this.landmarker=null,(n=this.stream)==null||n.getTracks().forEach(s=>s.stop()),this.stream=null,this.video.srcObject=null,this.handStates.clear(),this.prevMode="idle",this.prevSpinGrab=null,this.prevZoomDist=null,(i=this.overlay.getContext("2d"))==null||i.clearRect(0,0,this.overlay.width,this.overlay.height),this.emitStatus({hands:0,mode:"idle"})}processHands(t,n){const i=[],s=new Set;t.forEach((a,o)=>{const l=n[o];s.add(l);const c=Wo(a[zp],a[Gp]);if(c<1e-6)return;const u=Wo(a[Vo],a[Ho])/c,f={x:1-(a[Vo].x+a[Ho].x)/2,y:(a[Vo].y+a[Ho].y)/2};let h=this.handStates.get(l);h||(h={pinching:!1,grab:f},this.handStates.set(l,h)),h.pinching&&u>Fy?h.pinching=!1:!h.pinching&&u<Vp&&(h.pinching=!0),h.grab={x:h.grab.x+(f.x-h.grab.x)*Wp,y:h.grab.y+(f.y-h.grab.y)*Wp},h.pinching&&i.push(h.grab)});for(const a of this.handStates.keys())s.has(a)||this.handStates.delete(a);const r=i.length>=2?"zoom":i.length===1?"spin":"idle";if(r!==this.prevMode&&(this.prevSpinGrab=null,this.prevZoomDist=null,this.prevMode=r),r==="spin"){const a=i[0];if(this.prevSpinGrab){const o=a.x-this.prevSpinGrab.x,l=a.y-this.prevSpinGrab.y;(Math.abs(o)>1e-4||Math.abs(l)>1e-4)&&this.callbacks.onRotate(o*Hp,l*Hp)}this.prevSpinGrab=a}else if(r==="zoom"){const a=Math.hypot(i[0].x-i[1].x,i[0].y-i[1].y);if(this.prevZoomDist&&a>1e-4){const o=Math.min(1.18,Math.max(.85,this.prevZoomDist/a));this.callbacks.onZoom(o)}this.prevZoomDist=a}this.emitStatus({hands:t.length,mode:r})}emitStatus(t){(t.hands!==this.lastStatus.hands||t.mode!==this.lastStatus.mode)&&(this.lastStatus=t,this.callbacks.onStatus(t))}drawOverlay(t){const n=this.overlay.getContext("2d");if(!n)return;const{width:i,height:s}=this.overlay;n.clearRect(0,0,i,s);for(const r of t){const a=r[Vo],o=r[Ho],l=(1-a.x)*i,c=a.y*s,u=(1-o.x)*i,f=o.y*s,h=Wo(r[zp],r[Gp]),p=h>1e-6&&Wo(a,o)/h<Vp;n.strokeStyle=p?this.activePinch:this.activeGlow,n.lineWidth=p?2:1,n.beginPath(),n.moveTo(l,c),n.lineTo(u,f),n.stroke(),n.fillStyle=p?this.activePinch:this.activeHot;for(const[_,S]of[[l,c],[u,f]])n.beginPath(),n.arc(_,S,p?5:3,0,Math.PI*2),n.fill()}}}function Wo(e,t){return Math.hypot(e.x-t.x,e.y-t.y)}function By(e){let t=e.replace("#","");t.length===3&&(t=t.split("").map(i=>i+i).join(""));const n=parseInt(t,16);return Number.isNaN(n)?{r:255,g:170,b:48}:{r:n>>16&255,g:n>>8&255,b:n&255}}function ky(e){return Math.min(1,Math.max(0,e))}const Ng={ultron:{id:"ultron",glyph:"U",name:"ULTRON",blurb:"Iron-Man forge. Hot amber core, dense lattice, aggressive presence.",tagline:"FORGE · SURGE",scene:{bloomStrength:2,aberration:.0035,surge:1,spin:[1,1.6],debrisDrift:1,dustOpacity:.5,coreBrightness:1,variant:"ultron"},accentOverride:"#ffaa30"},nexus:{id:"nexus",glyph:"N",name:"NEXUS",blurb:"Cold instrument panel. Cyan precision, geometric calm, steady readout.",tagline:"PANEL · PRECISE",scene:{bloomStrength:1.4,aberration:.0015,surge:.35,spin:[1.3,1],debrisDrift:.5,dustOpacity:.3,coreBrightness:.6,variant:"nexus"},accentOverride:"#3fe0ff"},aegis:{id:"aegis",glyph:"A",name:"AEGIS",blurb:"Defensive sentinel lattice. Violet arcs, crystalline shell, guarded.",tagline:"SENTINEL · ARCS",scene:{bloomStrength:1.7,aberration:.0022,surge:.6,spin:[.8,1.3],debrisDrift:.7,dustOpacity:.42,coreBrightness:.8,variant:"aegis"},accentOverride:"#a78bfa"}},Fg=["ultron","nexus","aegis"];function zy(e){return e==="ultron"||e==="nexus"||e==="aegis"}function Gy(e){return Ng[zy(e)?e:"ultron"]}const Jr=document.getElementById("stage"),Vy=document.getElementById("hud"),Hy=document.getElementById("hint"),Ls=document.getElementById("gestureState"),Xp=document.getElementById("dock"),Og={ultron:"#ffaa30",nexus:"#3fe0ff",aegis:"#a78bfa"};let Ze=null,Cs=null,Bg="ultron",Ps=!1;function Wy(){const e=location.hash.replace("#/","").replace("#","");return Fg.includes(e)?e:"ultron"}function Xy(e){Bg=e;const t=Gy(e),n=Og[e],i=Yy(n);document.documentElement.style.setProperty("--acc",n),document.documentElement.style.setProperty("--acc-rgb",`${i.r}, ${i.g}, ${i.b}`),document.documentElement.style.setProperty("--line",`rgba(${i.r}, ${i.g}, ${i.b}, 0.18)`),Vy.innerHTML=`
    <div class="title">${t.name}</div>
    <div class="sub">${t.tagline}</div>
    <div class="tag"><span class="dot"></span>${t.blurb}</div>
  `,Hy.textContent=t.id==="ultron"?"drag to spin · scroll to zoom · OPEN PALM to gesture":t.id==="nexus"?"drag to spin · scroll to zoom · PINCH to gesture":"drag to spin · scroll to zoom · SWIPE to gesture",Ze==null||Ze.dispose(),Ze=$M(Jr,qM(n),{...t.scene,variant:t.id}),Xp.innerHTML="";for(const s of Fg){const r=Ng[s],a=document.createElement("button");a.className=s===e?"active":"",a.innerHTML=`<span class="dot"></span>${r.name}`,a.onclick=()=>{location.hash=`/${s}`},Xp.appendChild(a)}}function Yy(e){const t=parseInt(e.slice(1),16);return{r:t>>16&255,g:t>>8&255,b:t&255}}let gf=!1,Jh=0,jh=0;Jr.addEventListener("pointerdown",e=>{gf=!0,Jh=e.clientX,jh=e.clientY,Jr.setPointerCapture(e.pointerId)});window.addEventListener("pointermove",e=>{gf&&(Ze==null||Ze.rotateBy((e.clientX-Jh)/Jr.clientWidth*6,(e.clientY-jh)/Jr.clientHeight*6),Jh=e.clientX,jh=e.clientY)});window.addEventListener("pointerup",()=>{gf=!1});Jr.addEventListener("wheel",e=>{e.preventDefault(),Ze==null||Ze.zoomBy(e.deltaY<0?.9:1.12)},{passive:!1});const Yp=["idle","listening","thinking","speaking","working","alert"];function kg(){const e=Date.now()/1e3,t=.35+.6*(.5+.5*Math.sin(e*.6)),n=.25*(.5+.5*Math.sin(e*1.7)),i=Math.floor(3*(.5+.5*Math.sin(e*.35))),s=Yp[Math.floor(e*.22%Yp.length)];Ze==null||Ze.setFeed({energy:t,amplitude:n,satellites:i,state:s})}setInterval(()=>{kg()},120);kg();async function qy(){if(Ps=!Ps,Ls.textContent=Ps?"CAMERA ON":"CAMERA OFF",Ls.classList.toggle("on",Ps),!Ps){Cs==null||Cs.stop(),Cs=null;return}const e=document.createElement("video");e.autoplay=!0,e.muted=!0,e.playsInline=!0,e.style.cssText="position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-999px;top:0;",document.body.appendChild(e);const t=document.createElement("canvas");t.style.cssText="position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-999px;top:0;",document.body.appendChild(t);try{Cs=new Oy(e,t,{onRotate:(n,i)=>Ze==null?void 0:Ze.rotateBy(n,i),onZoom:n=>Ze==null?void 0:Ze.zoomBy(n),onStatus:n=>{Ls.textContent=`HANDS ${n.hands} · ${n.mode.toUpperCase()}`,n.hands===0&&(Ls.textContent=Ps?"CAMERA ON · NO HANDS":"CAMERA OFF")}}),Cs.setPalette(Og[Bg]),await Cs.start()}catch{Ps=!1,Ls.textContent="CAMERA UNAVAILABLE",Ls.classList.remove("on")}}Ls.onclick=qy;function zg(){Xy(Wy())}window.addEventListener("hashchange",zg);zg();
