from odoo import api, fields, models


class StudentRecord(models.Model):
    _name = "student.record"
    _description = "student_record"

    roll_no = fields.Char(string='Student ID', required=True,
                          copy=False, readonly=True,
                          index=True, default=lambda self: ('New'))
    name = fields.Char(string="Name")
    dob = fields.Date(string="dob")
    email = fields.Char(string="email")


    @api.model
    def create(self, vals):
        if vals.get('roll_no', ('New')) == ('New'):
            vals['roll_no'] = self.env['ir.sequence'].next_by_code(
                'student.record') or ('New')
            result = super(StudentRecord, self).create(vals)
        return result
