(function(){
'use strict';

var KEY = 'attendance-assistant-v1';
var LABEL = {present:'Present', late:'Late', absent:'Absent'};
var SAMPLE = ['Aisha Khan','Ben Carter','Chloe Martin','Daniel Okafor','Elena Rossi','Farid Haddad','Grace Lee','Hiro Tanaka','Isabel Costa','Jonas Weber'];

var STATUS = {present:'present',here:'present',attended:'present',attending:'present',
              absent:'absent',away:'absent',missing:'absent',sick:'absent',ill:'absent',
              late:'late',tardy:'late',delayed:'late'};
var ALL = new Set(['all','everyone','everybody']);
var REST = new Set(['rest','others','remaining','else','remainder']);
var EXCEPT = new Set(['except','but','besides']);
var FILLER = new Set(('mark marked set put make is are was were as today please and the a an also then that has have been still down them both he she they to be for with will it this i my me can could you his her him on in at of from up out just only now came come coming arrived arrive arrives running showed turned show minutes minute mins min hour hours morning day student students class people kids pupils children team members name names s t').split(' '));

var HELP = 'I update the register from plain sentences. Try:\n\u2022 Aisha late, Ben absent, everyone else present\n\u2022 Mark everyone present except Grace\n\u2022 Who is absent?\n\u2022 Summary\n\u2022 Add Priya Nair, or Remove Ben\n\u2022 Undo';

function $(id){ return document.getElementById(id); }
function uid(){ return 's' + Math.random().toString(36).slice(2, 9); }
function esc(s){ return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function pad(n){ return String(n).padStart(2,'0'); }
function iso(d){ return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()); }
function pretty(s){ var p = s.split('-').map(Number); return new Date(p[0], p[1]-1, p[2]).toLocaleDateString(undefined, {weekday:'short', day:'numeric', month:'short', year:'numeric'}); }
function initials(n){ var p = n.trim().split(/\s+/); return ((p[0]||'')[0] || '') + ((p.length > 1 ? p[p.length-1][0] : '') || ''); }
function plural(n, one, many){ return n + ' ' + (n === 1 ? one : many); }

/* ---------- state ---------- */
function load(){
  try{
    var raw = localStorage.getItem(KEY);
    if(raw){
      var s = JSON.parse(raw);
      if(s && Array.isArray(s.students) && s.records) return s;
    }
  }catch(e){}
  return {students: SAMPLE.map(function(n){ return {id: uid(), name: n}; }), records: {}};
}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} }

var state = load();
