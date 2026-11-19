(function(){
  'use strict';
  var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var Q=window.QH4||{};

  /* Header */
  var hd=$('.hd'), nav=$('.nav'), bg=$('.burger');
  function onScroll(){hd.classList.toggle('sc',window.scrollY>40)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  if(bg){bg.addEventListener('click',function(){var o=nav.classList.toggle('on');bg.classList.toggle('on',o);bg.setAttribute('aria-expanded',o)});
    $$('a',nav).forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('on');bg.classList.remove('on');bg.setAttribute('aria-expanded','false')})})}

  /* Reveal */
  var rv=$$('.rv,.rv-c');
  if('IntersectionObserver' in window && !reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.14,rootMargin:'0px 0px -6% 0px'});
    rv.forEach(function(el){io.observe(el)});
  }else{rv.forEach(function(el){el.classList.add('in')})}

  /* Parallax leve no hero */
  var pm=$('.art-main img'), pd=$('.art-d'), tag=$('.art-tag'), vn=$('.veins'), tick=false;
  if(pm && !reduce){
    window.addEventListener('scroll',function(){
      if(tick)return;tick=true;
      requestAnimationFrame(function(){
        var y=Math.min(window.scrollY,900);
        pm.style.transform='translateY('+(-y*.07)+'px)';
        if(vn)vn.style.transform='translateY('+(y*.12)+'px)';
        if(pd)pd.style.translate='0 '+(y*-.05)+'px';
        tick=false;
      });
    },{passive:true});
  }

  /* Galeria: botões, arraste e lightbox */
  var rail=$('.rail');
  if(rail){
    var step=function(){return Math.min(rail.clientWidth*.8,520)};
    $('.rail-prev').addEventListener('click',function(){rail.scrollBy({left:-step(),behavior:'smooth'})});
    $('.rail-next').addEventListener('click',function(){rail.scrollBy({left:step(),behavior:'smooth'})});
    var down=false,sx=0,sl=0,moved=false;
    rail.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=rail.scrollLeft});
    window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>5){moved=true;rail.classList.add('drag')}rail.scrollLeft=sl-dx});
    window.addEventListener('pointerup',function(){down=false;rail.classList.remove('drag')});
    var imgs=$$('figure',rail).map(function(f){return {src:$('img',f).currentSrc||$('img',f).src,alt:$('img',f).alt}});
    var lb=$('.lb'),lbi=$('img',lb),cur=0;
    function show(i){cur=(i+imgs.length)%imgs.length;lbi.src=imgs[cur].src;lbi.alt=imgs[cur].alt}
    function open(i){show(i);lb.classList.add('on');document.body.style.overflow='hidden'}
    function close(){lb.classList.remove('on');document.body.style.overflow=''}
    $$('figure',rail).forEach(function(f,i){$('.zoom',f).addEventListener('click',function(){if(!moved)open(i)})});
    $('.x',lb).addEventListener('click',close);$('.pv',lb).addEventListener('click',function(){show(cur-1)});$('.nx',lb).addEventListener('click',function(){show(cur+1)});
    lb.addEventListener('click',function(e){if(e.target===lb)close()});
    document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
  }

  /* Formulário */
  var f=$('#form');
  if(f){
    var btn=$('button[type=submit]',f), started=false, tel=$('#whatsapp',f);
    function valid(){btn.disabled=!f.checkValidity()}
    tel.addEventListener('input',function(){
      var d=tel.value.replace(/\D/g,'').slice(0,11), o=d;
      if(d.length>10)o='('+d.slice(0,2)+') '+d.slice(2,7)+'-'+d.slice(7);
      else if(d.length>6)o='('+d.slice(0,2)+') '+d.slice(2,6)+'-'+d.slice(6);
      else if(d.length>2)o='('+d.slice(0,2)+') '+d.slice(2);
      else if(d.length)o='('+d;
      tel.value=o;
    });
    ['input','change'].forEach(function(ev){f.addEventListener(ev,valid)});
    f.addEventListener('focusin',function(){if(!started){started=true;Q.push&&Q.push('form_start')}});
    valid();
    f.addEventListener('submit',function(e){
      e.preventDefault();if(!f.checkValidity()){f.reportValidity();return}
      var v=function(id){return ($('#'+id,f).value||'').trim()};
      var data={nome:v('nome'),whatsapp:v('whatsapp'),projeto:v('projeto'),cidade:v('cidade'),detalhes:v('detalhes'),lp:Q.LP,pagina:location.href,origem:document.referrer||'direto'};
      (location.search||'').replace(/^\?/,'').split('&').forEach(function(p){var kv=p.split('=');if(/^utm_|^gclid$|^fbclid$/.test(kv[0]))data[kv[0]]=decodeURIComponent(kv[1]||'')});
      btn.disabled=true;btn.textContent='Enviando...';
      Q.push&&Q.push('generate_lead',{lead_projeto:data.projeto,lead_cidade:data.cidade});
      Q.adsConv&&Q.adsConv(Q.ADS_CONVERSAO_LEAD);
      if(Q.WEBHOOK_URL){
        fetch(Q.WEBHOOK_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(data)})
          .catch(function(){}).then(function(){location.href='obrigado.html?r=1'});
      }else{
        var msg='Olá! Vim pelo site da Ilustra Marmoraria e gostaria de um orçamento.\n\n'+
          '*Nome:* '+data.nome+'\n*WhatsApp:* '+data.whatsapp+'\n*Projeto:* '+data.projeto+'\n*Cidade da obra:* '+data.cidade+
          (data.detalhes?'\n*Detalhes:* '+data.detalhes:'');
        window.open('https://wa.me/'+Q.WHATSAPP+'?text='+encodeURIComponent(msg),'_blank');
        setTimeout(function(){location.href='obrigado.html'},400);
      }
    });
  }
})();
