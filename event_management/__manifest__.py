# -*- coding: utf-8 -*-
{
    'name': "event_management",
    'summary': """This module will store event details""",
    'description': """This module will store event details""",
    'author': "My Company",
    'website': "http://www.aktivsoftware.com",
    'category': 'Uncategorized',
    'version': '13.0.1.0.0',
    'depends': ['base', 'website_event', 'website', 'website_sale'],
    'data': [
        'security/ir.model.access.csv',
        'views/assets.xml',
        # 'views/views.xml',
        'data/ir_sequence_data.xml',
        'data/website_data.xml',
        'views/templates.xml',
        'views/student_template_views.xml',
        'views/student_record_views.xml',
    ],

}
