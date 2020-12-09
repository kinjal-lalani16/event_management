# -*- coding: utf-8 -*-
# from odoo import http


# class EventManagement(http.Controller):
#     @http.route('/event_management/event_management/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/event_management/event_management/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('event_management.listing', {
#             'root': '/event_management/event_management',
#             'objects': http.request.env['event_management.event_management'].search([]),
#         })

#     @http.route('/event_management/event_management/objects/<model("event_management.event_management"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('event_management.object', {
#             'object': obj
#         })
