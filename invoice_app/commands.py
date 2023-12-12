from flask import Flask, render_template, request, redirect, url_for
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

app=Flask(__name__)

engine = create_engine('sqlite:///studentList.db')

Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()

@app.route('/')
@app.route('/student')
def showStudents():
   student = session.query(Student).all()
   return render_template("student.html", student=student)

#Function to add a student
@app.route('/student/new/',methods=['GET','POST'])
def newStudent():
   if request.method == 'POST':
       newStudent = Student(fname = request.form['fname'], lname = request.form['lname'], subject = request.form['subject'])
       session.add(newStudent)
       session.commit()
       return redirect(url_for('showStudents'))
   else:
       return render_template('newStudent.html')

#Function to edit a student
@app.route("/student/<int:student_id>/edit/", methods = ['GET', 'POST'])
def editStudent(student_id):
   editedStudent = session.query(Student).filter_by(id=student_id).one()
   if request.method == 'POST':
       if request.form['subject']:
           editedStudent.subject = request.form['subject']
           return redirect(url_for('showStudents'))
   else:
       return render_template('editStudent.html', student = editedStudent)

#Function to delete a student
@app.route('/student/<int:student_id>/delete/', methods = ['GET','POST'])
def deleteStudent(student_id):
   studentToDelete = session.query(Student).filter_by(id=student_id).one()
   if request.method == 'POST':
       session.delete(studentToDelete)
       session.commit()
       return redirect(url_for('showStudents', student_id=student_id))
   else:
       return render_template('deleteStudent.html',student = studentToDelete)

if __name__ == '__main__':
   app.run()