#-*- coding: utf-8 -*-
from odoo import http
from odoo.http import request
import json
from datetime import datetime



class Student(http.Controller):
    @http.route('/student/', auth='user', type="http", website=True)
    def show_student(self, **kwargs):
        students = request.env['student.record'].search([])
        return request.render('event_management.portal_student', {
            'students': students})

    @http.route('/substu/', auth="public", type='json', website=True)
    def create_edit_common_student(self, **kwargs):
        student = request.env['student.record']
        if kwargs['id'] == '':
            student.create({
                'name': kwargs.get('name'),
                'dob': kwargs.get('dob'),
                'email': kwargs.get('email'),
            })
        else:

            student.browse(int(kwargs.get('id'))).write(
                {
                    'name': kwargs.get('name'),
                    'email': kwargs.get('email'),
                    'dob': datetime.strptime(kwargs.get('dob'),"%Y-%m-%d").date(),
                })
        return True
