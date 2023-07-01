const nbcm_views_all = {
    'post': {
    },
}
const nbcm_views = {
    '/circuits/circuit-terminations/' : {
    },
    '/circuits/circuits/' : {
    },
    '/circuits/providers/' : {
    },
    '/dcim/device-types/': {
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Interfaces': ['interfaces/', 'mdi-ethernet'],
        'Device Bays': ['device-bays/', 'mdi-dots-vertical'],
    },
    '/dcim/devices/': {
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Layout': ['../../interfaces/?device_id=$id$&export=interface-layouts', 'mdi-grid-large'],
        'Interfaces': ['interfaces/', 'mdi-ethernet'],
        'Connections': ['../../interface-connections/?device_id=$id$', 'mdi-link'],
        'Cables': ['../../cables/?device_id=$id$', 'mdi-ethernet-cable']
    },
    '/dcim/status/': {
        'Planned': ['/api/dcim/devices/$id$/val=planned', 'mdi-lightbulb-on-10'],
        'Prepped': ['/api/dcim/devices/$id$/val=prepped', 'mdi-screwdriver'],
        'Configured': ['/api/dcim/devices/$id$/val=configured', 'mdi-cog-outline'],
        'Rigged': ['/api/dcim/devices/$id$/val=rigged', 'mdi-cable-data'],
        'Online': ['/api/dcim/devices/$id$/val=online', 'mdi-access-point'],
        'Offline': ['/api/dcim/devices/$id$/val=offline', 'mdi-access-point-off'],
        'Spare': ['/api/dcim/devices/$id$/val=spare', 'mdi-table'],
        'Show Device': ['/dcim/devices/$id$/', 'mdi-open-in-new']
    },
    '/nepapi/boolean/': {
        'True': ['/api/dcim/devices/$id$/val=true', 'mdi-check-bold'],
        'False': ['/api/dcim/devices/$id$/val=false', 'mdi-cancel']
    },
    '/nepapi/ref/': {
        'PTP': ['/api/dcim/devices/$id$/val=PTP', 'mdi-clock-digital'],
        'B&B': ['/api/dcim/devices/$id$/val=B&B', 'mdi-ethernet-cable'],
        'Tri-Level': ['/api/dcim/devices/$id$/val=Tri-Level', 'mdi-ethernet-cable'],
        'CP': ['/api/dcim/devices/$id$/val=CP', 'mdi-check-bold'],
        'None': ['/api/dcim/devices/$id$/val=None', 'mdi-cancel']
    },
    '/dcim/front-ports/': {
    },
    '/dcim/interfaces/': {
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Trace': ['trace', 'mdi-transit-connection-variant'],
    },
    '/dcim/racks/': {
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Devices': ['/dcim/devices/?rack_id=$id$', 'mdi-dots-vertical'],
        'Power Feeds': ['/dcim/power-feeds/?rack_id=$id$', 'mdi-dots-vertical'],
    },
    '/dcim/rear-ports/': {
    },
    '/ipam/aggregates/': {
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Prefixes': ['/ipam/aggregates/$id$/prefixes', 'mdi-chart-pie'],
    },
    '/ipam/ip-addresses/': {
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'SSH': ['ssh://$obj_ip$', 'mdi-monitor-lock', '_blank'],
        'HTTPS': ['https://$obj_ip$', 'mdi-cloud-lock', '_blank'],
    },
    '/ipam/prefixes/': {
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Child Prefixes': ['prefixes/', 'mdi-chart-pie'],
        'Child IPranges': ['ip-ranges/', 'mdi-barcode'],
        'IP Addresses': ['ip-addresses/', 'mdi-dots-vertical'],
    },
    '/ipam/vlan-groups/': {
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'VLANs': ['/ipam/vlans/?group_id=$id$', 'mdi-dots-horizontal'],
    },
    '/ipam/vlans/': {
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Device Interfaces': ['interfaces/', 'mdi-chart-pie'],
        'VM Interfaces': ['vm-interfaces/', 'mdi-barcode'],
    },
    '/ipam/vrfs/': {
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Prefixes': ['/ipam/prefixes/?vrf_id=$id$', 'mdi-dots-horizontal'],
    },
    '/tenancy/tenant-groups/': {
    },
    '/tenancy/tenants/': {
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'VLANs': ['/ipam/vlans/?tenant_id=$id$', 'mdi-dots-horizontal'],
        'Prefixes': ['/ipam/prefixes/?tenant_id=$id$', 'mdi-dots-horizontal'],
        'Devices': ['/dcim/devices/?tenant_id=$id$', 'mdi-dots-horizontal'],
        'VMs': ['/virtualization/virtual-machines/?tenant_id=$id$', 'mdi-dots-horizontal'],
    },
    '/virtualization/clusters' : {
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'VMs': ['virtual-machines/', 'mdi-dots-horizontal'],
        'Devices': ['devices/', 'mdi-dots-horizontal'],
    },
    '/virtualization/virtual-machines': {
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Interfaces': ['interfaces/', 'mdi-chart-pie'],
        'SSH': ['ssh://$obj$', 'mdi-monitor-lock', '_blank'],
        'HTTPS': ['https://$obj$', 'mdi-cloud-lock', '_blank'],
    },
};


function nbcmHideBox() {
    document.getElementById("nbcmboxmenu").style.display = "none";
    const boxes = document.getElementsByClassName("nbcm-open");
    for (let index = 0; index < boxes.length; index++) {
        const box = boxes[index];
        box.classList.remove('nbcm-open');   
    }
}

function nbcmShowbox(e) {
    e.preventDefault();

    const nbcmboxmenu = document.getElementById("nbcmboxmenu");
    if (!nbcmboxmenu) return;

    const current_url = window.location.pathname + window.location.search + window.location.hash
    if (
        e.currentTarget.classList.contains('status_dropdown')
        || e.currentTarget.classList.contains('boolean_dropdown')
        || e.currentTarget.classList.contains('multi_dropdown')
    ) {
        target = e.currentTarget.getElementsByClassName('nbcm-box')[0];
    } else {
        target = e.currentTarget;
    }
    
    target.classList.add('nbcm-open');
    const url = new URL(target.url)
    const nbcmboxpos = target.getBoundingClientRect();
    const urlpath = url.pathname;
    const parts = urlpath.split('/');
    const id = parts[3];
    let objtext = document.getElementsByClassName('nbcm-open')[0].parentElement.innerText;
    const nbcmmenu = nbcmboxmenu.getElementsByClassName('nbcm-menu')[0]
    let urltarget = ''
    nbcmmenu.innerHTML = '';
    for (const view of Object.keys(nbcm_views)) {
        if (urlpath.startsWith(view)) {
            for (const item of Object.keys(nbcm_views[view])) {
                let newurl = new URL(url);
                const viewitem = nbcm_views[view][item];
                const uri = viewitem[0].split('?');
                let displayitem = item;
                let api = false;
                if (viewitem.length>2) {
                    urltarget = viewitem[2]
                    displayitem = displayitem + ' <i class="mdi mdi-open-in-new" style="margin-left:0.2em"></i>'
                }    
                if (viewitem[0] == '#copy') {
                    newurl='#" onclick="window.navigator.clipboard.writeText(\''+objtext.replace("'","\\'")+'\')'
                } else if (viewitem[0].startsWith('/api')) {
                    newurl.pathname = uri[0].replace('$id$', id).replace('$obj_ip$', objtext.split('/')[0]).replace('$obj$', objtext).replace('$current_url$',current_url);
                    api = true;
                } else if (viewitem[0].startsWith('/')) {
                    newurl.pathname = uri[0].replace('$id$', id).replace('$obj_ip$', objtext.split('/')[0]).replace('$obj$', objtext).replace('$current_url$',current_url);
                } else if (viewitem[0].includes('://')) {
                    newurl = uri[0].replace('$id$', id).replace('$obj_ip$', objtext.split('/')[0]).replace('$obj$', objtext).replace('$current_url$',current_url);
                } else {
                    newurl.pathname += uri[0];
                }
                if (uri.length>1) {
                    for (let vars of uri[1].split('&')) {
                        vars = vars.split(/=(.+)/)
                        newurl.searchParams.set(vars[0], vars[1].replace('$id$', id).replace('$obj_ip$', objtext.split('/')[0]).replace('$obj$', objtext).replace('$current_url$',current_url));
                    }
                }
                if (api) {
                    const api_li = document.createElement("li");
                    const api_a = document.createElement("a");
                    const api_i = document.createElement("i");
                    const api_span = document.createElement("span");
                    api_li.classList.add('list-group-item', 'list-group-item-action', 'nbcm-api-li');
                    api_li.dataset.link = newurl;
                    api_li.dataset.field = target.parentElement.dataset.field;
                    api_a.classList.add('nbcm-api');
                    api_a.href = "#";
                    api_i.classList.add('mdi', viewitem[1]);
                    api_span.innerText = displayitem;
                    api_li.append(api_a);
                    api_a.append(api_i);
                    api_a.append(api_span);
                    nbcmmenu.append(api_li);
                } else {
                    const itemTxt = item == 'Delete' ? ' trash' : '';
                    let targetTxt = ` target="${urltarget}"`;
                    if (urltarget == '') targetTxt = ' target="_blank"';
                    if (viewitem[0] == '#copy') targetTxt = ' target=""';
                    nbcmmenu.innerHTML += `<li class="list-group-item list-group-item-action${itemTxt}"><a href="${newurl}"${targetTxt}><i class="mdi ${viewitem[1]}"></i> ${displayitem}</a></li>`;
                }
            }
        }
    }
    nbcmboxmenu.style.display = "block";

    const menuWidth = nbcmboxmenu.offsetWidth + 8;
    const menuHeight = nbcmboxmenu.offsetHeight + 8;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if ((windowWidth - nbcmboxpos.x) < menuWidth) {
        nbcmboxmenu.style.left = windowWidth - menuWidth + (nbcmboxpos.width * -0.05) + "px";
    } else {
        nbcmboxmenu.style.left = nbcmboxpos.x + (nbcmboxpos.width * -0.05) + "px";
    }

    if ((windowHeight - nbcmboxpos.y) < menuHeight) {
        nbcmboxmenu.style.top = windowHeight - menuHeight - 5 + "px";
    } else {
        nbcmboxmenu.style.top = nbcmboxpos.y - 5 + "px";
    }
    const apis = document.getElementsByClassName('nbcm-api-li');
    for (let index = 0; index < apis.length; index++) {
        const api = apis[index];
        api.addEventListener('click', function(e) {
            e.preventDefault;
            const url = e.target.dataset.link;
            const status = url.substring(url.indexOf("/val=")+5);
            const uri = url.substring(url.indexOf("/val="), -5);
            const field = e.target.dataset.field == "undefined" ? "status" : e.target.dataset.field;
            let payload;
            if (field == "status") {
                payload = `{"${field}":"${status}"}`;
            } else if (field == "ref") {
                payload = `{"custom_fields": {"${field}":"${status}"}}`
            } else {
                payload = `{"custom_fields": {"${field}":${status}}}`
            }
            fetch(uri+'/', {
                credentials: "omit",
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token 33cb389f41c7f8a4331c25947fd5966148cd56eb',
                    'Accept': 'application/json'
                },
                body: payload
            }).then(response => {
                const hasMenu = document.getElementsByClassName("nbcm-open");
                if (hasMenu.length == 0) return;
                const target = hasMenu[0].parentElement;
                if (field == "status") {
                    target.classList.remove('bg-purple','bg-cyan','bg-white','bg-red','bg-green','bg-blue','bg-indigo','bg-yellow');
                    const textCont = target.querySelector('.status_label')
                    switch (status) {
                        case 'planned':
                            target.classList.add('bg-purple');
                            textCont.innerText = 'Planned';
                            break;
                        case 'prepped':
                            target.classList.add('bg-yellow');
                            textCont.innerText = 'Prepped';
                            break;
                        case 'rigged':
                            target.classList.add('bg-cyan');
                            textCont.innerText = 'Rigged';
                            break;
                        case 'configured':
                            target.classList.add('bg-blue');
                            textCont.innerText = 'Configured';
                            break;
                        case 'online':
                            target.classList.add('bg-green');
                            textCont.innerText = 'Online';
                            break;
                        case 'offline':
                            target.classList.add('bg-red');
                            textCont.innerText = 'Offline';
                            break;
                        case 'spare':
                            target.classList.add('bg-white');
                            textCont.innerText = 'Spare';
                            break;
                        default:
                            break;
                    }
                } else if (field == "ref") {
                    response.json().then(data=>{
                        const newVal = data.custom_fields[field];
                        target.parentElement.classList.remove('bg-dark', 'bg-green');
                        target.classList.remove('text-black');
                        if (newVal != "None") target.classList.add('bg-green');
                        if (newVal != "None") target.classList.add('text-black');
                        target.querySelector('.multi-text').innerText = newVal;
                    });
                } else {
                    response.json().then(data=>{
                        const newVal = data.custom_fields[field];
                        target.parentElement.classList.remove('text-black', 'bg-green');
                        //target.parentElement.classList.add(newVal ? 'bg-green' : 'bg-dark');
                        if (newVal) target.classList.add('bg-green');
                        if (newVal) target.classList.add('text-black');
                    });
                }
            })
        });
    };
}

function nbcm_page_load() {
    if (document.querySelector('#nbcmboxmenu') == null) {
        const nbcmboxmenu = document.createElement("div");
        nbcmboxmenu.id = "nbcmboxmenu";
        nbcmboxmenu.className = "card nbcm-context-menu";
        nbcmboxmenu.style = "display: none";
        const nbcmboxmenuul = nbcmboxmenu.appendChild(document.createElement("ul"));
        nbcmboxmenuul.className="list-group nbcm-menu";
        document.body.appendChild(nbcmboxmenu);
        nbcmboxmenu.addEventListener('mouseleave', function (e) {
            nbcmHideBox(e)
        }, false);
    }

    const types = ['status_dropdown','boolean_dropdown','multi_dropdown'];
    for (let i = 0; i < types.length; i++) {
        const drops = document.getElementsByClassName(types[i]);
        for (let index = 0; index < drops.length; index++) {
            const drop = drops[index];
            drop.addEventListener('mouseout', function (e) {
                if (e.relatedTarget.classList.contains('list-group-item') ||
                    e.relatedTarget.classList.contains('nbcm-menu') ||
                    e.relatedTarget.classList.contains('mdi')) return;
                nbcmHideBox(e);
            }, false);
        }
    }
}

function nbcm_build_menu(type = "all") {
    const classes = ['table', 'group-frame']
    let i, j, k;
    const nbcm_views_keys = Object.keys(nbcm_views)

    for (k = 0; k < classes.length; k++) {
        const divs = document.getElementsByClassName(classes[k]);
        for (i = 0; i < divs.length; i++) {
            let links = [];
            switch (type) {
                case "status":
                    links = Array.prototype.concat.apply(links, divs[i].getElementsByClassName('status_dropdown'));
                    break;
                case "menus":
                    links = Array.prototype.concat.apply(links, divs[i].getElementsByTagName('a'));
                    break;
                case "all":
                default:
                    links = Array.prototype.concat.apply(links, divs[i].getElementsByClassName('status_dropdown'));
                    links = Array.prototype.concat.apply(links, divs[i].getElementsByClassName('boolean_dropdown'));
                    links = Array.prototype.concat.apply(links, divs[i].getElementsByClassName('multi_dropdown'));
                    links = Array.prototype.concat.apply(links, divs[i].getElementsByTagName('a'));
                    break;
            }
            for (j = 0; j < links.length; j++) {
                const link = links[j];
                const uri = link.getAttribute("href");
                if (uri == null) continue;
                const parts = uri.split('/');
                const id = parts[3];
                const action = parts[4];
                if (!isNaN(0 + id) && !action && link.getElementsByTagName('i').length == 0 && link.textContent.trim().length > 0) {
                    // only add the menuicon to links that:
                    //  - the id (3th part of the urlpath) has to be a number (excludes the generic urls)
                    //  - the action (4th part of the urlpath) has to be empty (excludes the action buttons)
                    //  - there should be no <i> tag in the ahref (those are the bullets for intended ip/prefix/vlan/...)
                    //  - the ahref innerhtml is not empty.
                    for (const view of nbcm_views_keys) {
                        if (uri.startsWith(view)) {
                            // only add the menuicon to links that:
                            //  - start with the nbcm_views key
                            const frag = document.createDocumentFragment()
                            const nbcmbox = frag.appendChild(document.createElement("div"));
                            nbcmbox.className = "nbcm-box";
                            const nbcmspan = nbcmbox.appendChild(document.createElement("span"));
                            nbcmspan.id = "nbcmbox";
                            nbcmspan.className = "btn btn-sm nbcm-icon";
                            nbcmspan.title = "Actions";
                            const nbcmspani=nbcmspan.appendChild(document.createElement("i"));
                            nbcmspani.className="mdi mdi-menu";
                            
                            link.appendChild(frag)

                            link.style['white-space'] = 'nowrap';

                            nbcmbox.addEventListener('mouseover', function (e) {
                                nbcmShowbox(e)
                            }, false);

                            nbcmbox.url = link.href || location.origin+uri;
                            break;
                        }
                    }
                }
            }
        }
    }
}

function nbcm_add_burgers() {
    'use strict';
    nbcm_page_load();
    nbcm_build_menu("all");
}

function nbcm_add_status() {
    'use strict';
    nbcm_page_load();
    nbcm_build_menu("status");
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

if (!window.location.search.includes("site_id")) {
    const site_id = getCookie('site_id') || 0;
    const searchAdd = new URL(window.location);
    searchAdd.searchParams.set('site_id', site_id);
    window.location = searchAdd.toLocaleString();
} else {
    const searchGet = new URL(window.location);
    setCookie("site_id",searchGet.searchParams.get('site_id'));
}

window.addEventListener("load", event => {

    if (location.pathname == '/') {
        nbcm_add_status();
    } else {
        nbcm_add_burgers();
    }
    
    const nbcm_targetNode = document.getElementById('object_list');
    if (nbcm_targetNode) {
        const nbcm_observerconfig = { childList: true, subtree: true };
        const nbcm_observer = new MutationObserver(nbcm_add_burgers);
        nbcm_observer.observe(nbcm_targetNode, nbcm_observerconfig);
    }
    
    const nbcm_targetNodeHome = document.getElementById('dashboard');
    if (nbcm_targetNodeHome) {
        const nbcm_observerconfig = { childList: true, subtree: true };
        const nbcm_observerHome = new MutationObserver(nbcm_add_status);
        nbcm_observerHome.observe(nbcm_targetNodeHome, nbcm_observerconfig);
    }
    
    document.addEventListener("click", e => {
        if (e.target.tagName == 'TR' || e.target.parentElement?.tagName == 'TR') {
            const tr = e.target.tagName == 'TR' ? e.target : e.target.parentElement;
            tr.getElementsByClassName('form-check-input')[0].click();
        } else if (e.target.id == 'search-advanced') {
            const form = document.getElementById('search-advanced-form');
            const formData = new FormData(form);
            const params = new URLSearchParams(formData.entries());
            const sel = document.getElementById('id_content_types');
            if (sel == null) {
                path = location.pathname;
            } else {
                const type = document.querySelector(`#id_content_types [value="${sel.value}"]`).text;
                if (type == "---------") {
                    path = '/dcim/devices/';
                } else {
                    const [prefix, sufix] = type.split(' > ');
                    path = `/${prefix.toLowerCase()}/${sufix.toLowerCase().replace(' ', '-')}s/`;
                }
            }
            location.href = path+"?"+params.toString();
        } else if (e.target.id == 'config-copy') {
            const text = document.getElementById('config-content').innerHTML;
            navigator.clipboard.writeText(text);
        } else if (e.target.id == 'form-advanced-toggle') {
            const form = document.getElementById('edit-form');
            form.classList.toggle('show-advanced');
        } else if (e.target.classList.contains('site-selector')) {
            const currentParams = new URLSearchParams(location.search);
            currentParams.set("site_id", e.target.getAttribute('data-site-id'));
            window.location = location.pathname +"?"+ currentParams.toString();
        } else if (e.target.tagName == 'A' || e.target.closest('A') != undefined) {
            const search = e.target.tagName == 'A' ? e.target : e.target.closest('A');
            const currentParams = new URLSearchParams(location.search);
            const site_id = currentParams.get('site_id') || 0;
            const searchURL = new URL(search.href);
            if (searchURL.protocol == "ssh:") return;
            if (searchURL.host != location.host) return;
            const searchParams = searchURL.searchParams;
            searchParams.set("site_id", site_id);
            const fullSearch = searchURL.pathname +"?"+ searchParams.toString();
            if (searchURL.pathname != location.pathname) {
                e.preventDefault();
                const target = search.getAttribute('target') || "";
                if (target == "_blank") {
                    window.open(fullSearch);
                } else {
                    window.location = fullSearch;
                }
            }
        }
    });
});
