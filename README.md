# planview
This is a simple timesheet submission project which allows users to submit their timesheets for a week.
The work owner can login as administrator and assign the work to his/her registered members/users which
helps them to log and submit their timesheet inturn to the work owner back.

Pages & Workflow
1. UserRegistration
   firstname,lastname,dob,email,addressLine1,addrssLine2,city,state,country,zipcode,username,password,confirmPassword
2. Login
   - Administrator
   - User
3. Dashboard
   - Administrator
     - Inbox
	 - Submitted timesheets
	 - List of registered users
	   (In table view with Eidt/View/Unlock against each user)
   - User
     - Inbox
	 - Assigned WorkItem
4. WorkAssignment
   - CreateWorkType
   - CreateWorkItem
   - CreateWorkAssignment
5. Message
   - Display Message Inbox
   - Display Asigned WorkItem
6. Timesheet Entry
   - Multiple rows having following columns
     Date(calendar)
	 WorkItem (dropdown/list assigned work item only)
	 Hours
7. Reporting
   - Capture all api calls with url/user/timestamp
   - UsabilityReport
     (apiname,username,count)
