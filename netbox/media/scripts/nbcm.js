const nbcm_views_all = {
    'post': {
        'To Clipboard': ['#copy', 'mdi-content-copy']
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
        'Rigged': ['/api/dcim/devices/$id$/val=rigged', 'mdi-cable-data'],
        'Configured': ['/api/dcim/devices/$id$/val=configured', 'mdi-cog-outline'],
        'Online': ['/api/dcim/devices/$id$/val=online', 'mdi-access-point'],
        'Offline': ['/api/dcim/devices/$id$/val=offline', 'mdi-access-point-off'],
        'Spare': ['/api/dcim/devices/$id$/val=spare', 'mdi-table']
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
    let boxes = document.getElementsByClassName("nbcm-open");
    boxes.forEach(box => {
        box.classList.remove('nbcm-open');
    });
}

function nbcmShowbox(e) {
    e.preventDefault();

    const nbcmboxmenu = document.getElementById("nbcmboxmenu");
    if (nbcmboxmenu) {
        const current_url = window.location.pathname + window.location.search + window.location.hash
        if (e.currentTarget.classList.contains('status_dropdown')) {
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
        //var objtext = e.relatedTarget.innerText;
        let objtext = document.getElementsByClassName('nbcm-open')[0].parentElement.innerText;
        const nbcmmenu = nbcmboxmenu.getElementsByClassName('nbcm-menu')[0]
        let urltarget = ''
        nbcmmenu.innerHTML = '';
        for (const view of Object.keys(nbcm_views)) {
            if (urlpath.startsWith(view)) {
                const nbcm_view_full= {
                    ...nbcm_views_all['pre'],
                    ...nbcm_views[view],
                    ...nbcm_views_all['post'],
                }
                for (const item of Object.keys(nbcm_view_full)) {
                    let newurl = new URL(url);
                    const viewitem = nbcm_view_full[item];
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
                        api_a.classList.add('nbcm-api');
                        api_a.href = "#";
                        api_i.classList.add('mdi', viewitem[1]);
                        api_span.innerText = displayitem;
                        api_li.append(api_a);
                        api_a.append(api_i);
                        api_a.append(api_span);
                        //nbcmmenu.innerHTML = "";
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
        let apis = document.getElementsByClassName('nbcm-api-li');
        apis.forEach(api => {
            api.addEventListener('click', function(e) {
                e.preventDefault;
                const url = e.target.dataset.link;
                const status = url.substring(url.indexOf("/val=")+5);
                const uri = url.substring(url.indexOf("/val="), -5);
                let target = document.getElementsByClassName("nbcm-open")[0].parentElement;
                fetch(uri+'/', {
                    credentials: "omit",
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Token 33cb389f41c7f8a4331c25947fd5966148cd56eb',
                      'Accept': 'application/json'
                    },
                    body: `{"status":"${status}"}`
                }).then(response => {
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
                })
            });
        });
    }
}

function nbcm_page_load() {
    const css=[`
    .nbcm-box {
        white-space: nowrap;
        display: inline-flex;
    }
    .nbcm-icon {
        padding:.1rem .1rem;
        margin-left: .2rem;
        white-space: nowrap;
        opacity: 20%;
    }
    .nbcm-icon:hover {
        opacity: 80%; 
    }
    .nbcm-context-menu {
        position: absolute !important;
        padding:2px;
    }
    .nbcm-menu {
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        padding: 0;
        font-size: 16px;
    }
    .nbcm-menu > li {
        padding: 0px 8px !important;
        border: none !important;
        font-size: 1em
    }
    .nbcm-menu > li > a {
        text-decoration: unset;
        padding: 5px 5px;
        width: 100%;
        display: flex;
        transition: 0.5s linear;
        -webkit-transition: 0.5s linear;
        -moz-transition: 0.5s linear;
        -ms-transition: 0.5s linear;
        -o-transition: 0.5s linear;
    }
    .nbcm-menu > li > a > i {
        padding-right: 10px;
    }
    .nbcm-menu > li.trash > a:hover {
        color: red;
    }
    .status_dropdown #nbcmbox::before {
        content: "";
        position: absolute;
        width: 100%;
        top: 0;
        height: 100%;
        left: 0;
    }
    .status_dropdown {
        position: relative;
    }
    .status_dropdown .nbcm-box {
        width: 0;
        height: 0.8em;
        overflow: hidden;
    }
    .layout {
        --bg-col: rgb(233, 236, 239);
        --border-col: rgb(223, 223, 223)
    }
    html[data-netbox-color-mode="dark"] .layout {
        --bg-col: rgb(33, 37, 41);
        --border-col: rgb(53, 58, 64)
    }
    .nbcm-api-li {
        cursor: pointer;
    }
    .nbcm-api-li > * {
        pointer-events: none;
    }

    .logo-dark {
        display: none;
    }

    .logo-light {
        display: block;
    }

    html[data-netbox-color-mode="dark"] .logo-dark {
        display: block;
    }

    html[data-netbox-color-mode="dark"] .logo-light {
        display: none;
    }
    
    .link-custom {
        white-space: nowrap;
    }

    table .link-custom {
        display: inline-block;
        padding: .35em .65em;
        font-size: .75rem;
        font-weight: 700;
        line-height: 1;
        color: rgb(255, 255, 255);
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: .375rem;
        background-color: rgb(33, 150, 243);
    }

    [hx-get="/dcim/devices/?tag=switch&sort=name"] [hx-get="/dcim/devices/?tag=switch&sort=cl_First+Connection"],
    [hx-get="/extras/saved-filters/"] > div.row,
    [hx-get="/ipam/prefixes/?tag=quick-search"] > div.row,
    [hx-get="/ipam/prefixes/?tag=quick-search"] .noprint,
    [hx-get="/extras/saved-filters/"] .noprint {
        display: none;
    }

    .card-header.text-center.text-light.bg-black.p-1 {
        background-color: rgba(0, 112, 255, 0.13) !important;
    }

    .controls a[href="#nocontrol"] {
        display: none;
    }

    @media (max-width: 650px) {
        #nbcmbox {
            font-size: 2rem;
        }
    }
    
    @media (min-width: 850px) {
            .form.form-horizontal .noprint.bulk-buttons {
                position: sticky;
                bottom: 5px;
                padding: 0px 4px;
                width: max-content;
            }
            .form.form-horizontal .noprint.bulk-buttons .bulk-button-group{
                background-color: var(--bg-col);
                border: 1px solid var(--border-col);
                border-radius: 10px;
                padding: 2px;
            }
            .card #object_list .row {
                justify-content: end;
                position: sticky;
                bottom: 5px;
                padding: 0px 4px;
            }
            .card #object_list .row > * {
                width: auto;
                padding: 5px;
                background-color: var(--bg-col);
                border: 1px solid var(--border-col);
            }
            .card #object_list .row > :first-child {
                border-right: none;
                border-radius: 10px 0px 0px 10px;
            }
            .card #object_list .row > :last-child {
                border-left: none;
                border-radius: 0px 10px 10px 0px;
                display: flex;
                align-content: center;
                align-items: center;
                margin-left: -3px;
                padding-left: 0;
            }
            .card #object_list .row > :last-child .dropdown.dropup {
                padding-right: 10px;
            }
            #filters-form .card-footer {
                position: sticky;
                bottom: 0;
                background: var(--bg-col);
                border-top: var(--border-col) 1px solid !important;
            }
            [data-netbox-url-name=cable_add] .tab-content form > .row:last-child,
            .form-object-edit .text-end {
                position: sticky;
                bottom: 10px;
                width: fit-content;
                float: right;
                background: var(--bg-col);
                border: 1px solid var(--border-col);
                border-radius: 10px;
                padding: 5px;
                margin: 5px !important;
            }
            [data-netbox-url-name=cable_add] .tab-content form > .row:last-child > * {
                padding: 0 !important;
            }
        }`
    ]
    const head = document.getElementsByTagName('head')[0];
    if (head) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css.join("\r\n")));
        head.appendChild(style);
    }
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
    const drops = document.getElementsByClassName('status_dropdown');
    drops.forEach(drop => {
        drop.addEventListener('mouseout', function (e) {
            if (e.relatedTarget.classList.contains('list-group-item') ||
                e.relatedTarget.classList.contains('nbcm-menu') ||
                e.relatedTarget.classList.contains('mdi')) return;
            nbcmHideBox(e);
        }, false);
    });
}

function nbcm_build_menu(type = "all") {
    const classes = ['table']
    let i, j, k;
    const nbcm_views_keys = Object.keys(nbcm_views)

    for (k = 0; k < classes.length; k++) {
        const divs = document.getElementsByClassName(classes[k]);
        console.log(classes[k]);
        console.log(divs);
        for (i = 0; i < divs.length; i++) {
            console.log(divs[i]);
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

nbcm_add_burgers();

// Repaint after the tables are updated (ex QuickSearch or nbr items per page change)
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
    if (e.target.tagName == 'TR' || e.target.parentElement.tagName == 'TR') {
        const tr = e.target.tagName == 'TR' ? e.target : e.target.parentElement;
        tr.getElementsByClassName('form-check-input')[0].click();
    }
});