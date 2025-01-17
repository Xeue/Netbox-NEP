import django_tables2 as tables
from django.utils.html import format_html
from dcim.models import Location, Region, Site, SiteGroup, ProjectNames
from tenancy.tables import ContactsColumnMixin, TenancyColumnsMixin

from netbox.tables import NetBoxTable, columns

from .template_code import LOCATION_BUTTONS

__all__ = (
    'LocationTable',
    'RegionTable',
    'SiteTable',
    'SiteGroupTable',
)


#
# Regions
#

class RegionTable(ContactsColumnMixin, NetBoxTable):
    name = columns.MPTTColumn(
        linkify=True
    )
    site_count = columns.LinkedCountColumn(
        viewname='dcim:site_list',
        url_params={'region_id': 'pk'},
        verbose_name='Sites'
    )
    tags = columns.TagColumn(
        url_name='dcim:region_list'
    )

    class Meta(NetBoxTable.Meta):
        model = Region
        fields = (
            'pk', 'id', 'name', 'slug', 'site_count', 'description', 'contacts', 'tags', 'created', 'last_updated',
            'actions',
        )
        default_columns = ('pk', 'name', 'site_count', 'description')


#
# Site groups
#

class SiteGroupTable(ContactsColumnMixin, NetBoxTable):
    name = columns.MPTTColumn(
        linkify=True
    )
    site_count = columns.LinkedCountColumn(
        viewname='dcim:site_list',
        url_params={'group_id': 'pk'},
        verbose_name='Sites'
    )
    tags = columns.TagColumn(
        url_name='dcim:sitegroup_list'
    )

    class Meta(NetBoxTable.Meta):
        model = SiteGroup
        fields = (
            'pk', 'id', 'name', 'slug', 'site_count', 'description', 'contacts', 'tags', 'created', 'last_updated',
            'actions',
        )
        default_columns = ('pk', 'name', 'site_count', 'description')


#
# Sites
#

class SiteTable(TenancyColumnsMixin, ContactsColumnMixin, NetBoxTable):
    name = tables.Column(
        linkify=True
    )
    status = columns.ChoiceFieldColumn()
    region = tables.Column(
        linkify=True
    )
    group = tables.Column(
        linkify=True
    )
    asns = columns.ManyToManyColumn(
        linkify_item=True,
        verbose_name='ASNs'
    )
    asn_count = columns.LinkedCountColumn(
        accessor=tables.A('asns__count'),
        viewname='ipam:asn_list',
        url_params={'site_id': 'pk'},
        verbose_name='ASN Count'
    )
    comments = columns.MarkdownColumn()
    tags = columns.TagColumn(
        url_name='dcim:site_list'
    )

    class Meta(NetBoxTable.Meta):
        model = Site
        fields = (
            'pk', 'id', 'name', 'slug', 'status', 'facility', 'region', 'group', 'tenant', 'tenant_group', 'asns',
            'asn_count', 'time_zone', 'description', 'physical_address', 'shipping_address', 'latitude', 'longitude',
            'comments', 'contacts', 'tags', 'created', 'last_updated', 'actions', 'project_name',
        )
        default_columns = ('pk', 'name', 'status', 'facility', 'region', 'group', 'tenant', 'description')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def render_name(self, value, record):
        return f"{ProjectNames.get(record)}"


#
# Locations
#

class LocationTable(TenancyColumnsMixin, ContactsColumnMixin, NetBoxTable):
    name = columns.MPTTColumn(
        linkify=True
    )
    site = tables.Column(
        linkify=True
    )
    status = columns.ChoiceFieldColumn()
    rack_count = columns.LinkedCountColumn(
        viewname='dcim:rack_list',
        url_params={'location_id': 'pk'},
        verbose_name='Racks'
    )
    device_count = columns.LinkedCountColumn(
        viewname='dcim:device_list',
        url_params={'location_id': 'pk'},
        verbose_name='Devices'
    )
    tags = columns.TagColumn(
        url_name='dcim:location_list'
    )
    actions = columns.ActionsColumn(
        extra_buttons=LOCATION_BUTTONS
    )

    class Meta(NetBoxTable.Meta):
        model = Location
        fields = (
            'pk', 'id', 'name', 'site', 'status', 'tenant', 'tenant_group', 'rack_count', 'device_count', 'description',
            'slug', 'contacts', 'tags', 'actions', 'created', 'last_updated', 'project_name',
        )
        default_columns = ('name', 'site', 'status', 'rack_count', 'device_count', 'description', 'cl_Plug-up List')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def render_name(self, value, record):
        tree = ""
        if not self.order_by:
            tree = "\u00A0•\u00A0\u00A0" * record.level
        return format_html("</a><span class=\"record-depth\">{}</span><a href=\"{}\">{}</a>", tree, record.get_absolute_url(), ProjectNames.get(record))