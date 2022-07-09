VERSION 5.00
Begin VB.Form ActualSnake 
   BackColor       =   &H80000012&
   BorderStyle     =   1  'Fixed Single
   Caption         =   "Snake VB6"
   ClientHeight    =   4530
   ClientLeft      =   45
   ClientTop       =   390
   ClientWidth     =   4875
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   ScaleHeight     =   4530
   ScaleWidth      =   4875
   StartUpPosition =   3  'Windows Default
   Begin VB.CommandButton Restart 
      Caption         =   "Restart"
      Height          =   375
      Left            =   1800
      TabIndex        =   10
      Top             =   4200
      Width           =   1095
   End
   Begin VB.Frame PauseFrame 
      Caption         =   "Paused"
      Height          =   4095
      Left            =   0
      TabIndex        =   7
      Top             =   0
      Visible         =   0   'False
      Width           =   4815
      Begin VB.CommandButton ClosePause 
         Caption         =   "Resume"
         Height          =   375
         Left            =   1800
         TabIndex        =   9
         Top             =   3600
         Width           =   1095
      End
      Begin VB.Label Label1Control 
         Caption         =   "Sample"
         BeginProperty Font 
            Name            =   "Arial"
            Size            =   15
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   3495
         Left            =   120
         TabIndex        =   8
         Top             =   480
         Width           =   4575
      End
   End
   Begin VB.CommandButton AboutButton 
      Caption         =   "About"
      Height          =   495
      Left            =   2640
      TabIndex        =   5
      Top             =   2520
      Visible         =   0   'False
      Width           =   855
   End
   Begin VB.CommandButton ControlsButton 
      Caption         =   "Controls"
      Height          =   495
      Left            =   1200
      TabIndex        =   4
      Top             =   2520
      Visible         =   0   'False
      Width           =   855
   End
   Begin VB.Timer Timer1 
      Interval        =   500
      Left            =   4440
      Top             =   0
   End
   Begin VB.Label WinLabel 
      BackStyle       =   0  'Transparent
      Caption         =   "  You Win"
      BeginProperty Font 
         Name            =   "Arial Black"
         Size            =   27.75
         Charset         =   0
         Weight          =   900
         Underline       =   0   'False
         Italic          =   -1  'True
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H0000FF00&
      Height          =   1695
      Left            =   720
      TabIndex        =   6
      Top             =   720
      Visible         =   0   'False
      Width           =   3495
   End
   Begin VB.Label SpeedLabel 
      Caption         =   "Speed"
      Height          =   255
      Left            =   3360
      TabIndex        =   3
      Top             =   4200
      Width           =   1455
   End
   Begin VB.Label ScoreLabel 
      Caption         =   "Score: "
      Height          =   255
      Left            =   120
      TabIndex        =   2
      Top             =   4200
      Width           =   1455
   End
   Begin VB.Shape Rat 
      BackColor       =   &H8000000C&
      BackStyle       =   1  'Opaque
      Height          =   195
      Index           =   0
      Left            =   2200
      Shape           =   2  'Oval
      Top             =   2800
      Width           =   195
   End
   Begin VB.Label GameoverLabel 
      BackStyle       =   0  'Transparent
      Caption         =   "GameOver"
      BeginProperty Font 
         Name            =   "Arial Black"
         Size            =   27.75
         Charset         =   0
         Weight          =   900
         Underline       =   0   'False
         Italic          =   -1  'True
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H000000FF&
      Height          =   735
      Left            =   720
      TabIndex        =   1
      Top             =   1680
      Visible         =   0   'False
      Width           =   3495
   End
   Begin VB.Shape Snake 
      BackColor       =   &H0000C000&
      BackStyle       =   1  'Opaque
      BorderColor     =   &H8000000D&
      FillColor       =   &H0000C000&
      Height          =   195
      Index           =   2
      Left            =   1400
      Shape           =   3  'Circle
      Top             =   1400
      Width           =   195
   End
   Begin VB.Label Coordinates 
      Height          =   4095
      Left            =   0
      TabIndex        =   0
      Top             =   0
      Visible         =   0   'False
      Width           =   1455
   End
   Begin VB.Shape Snake 
      BackColor       =   &H0000C000&
      BackStyle       =   1  'Opaque
      BorderColor     =   &H8000000D&
      FillColor       =   &H0000C000&
      Height          =   195
      Index           =   1
      Left            =   1600
      Shape           =   3  'Circle
      Top             =   1400
      Width           =   195
   End
   Begin VB.Shape Snake 
      BackColor       =   &H0000C000&
      BackStyle       =   1  'Opaque
      BorderColor     =   &H8000000D&
      FillColor       =   &H0000C000&
      Height          =   200
      Index           =   0
      Left            =   1800
      Shape           =   3  'Circle
      Top             =   1400
      Width           =   200
   End
End
Attribute VB_Name = "ActualSnake"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
'---------------------------------------------------------------------------------------
' Module    : ActualSnake
' DateTime  : 4/20/2022 11:11
' Author    : Albert O'Connell
' Purpose   : A game of snake made for fun and to help understand the timer/Control positioning
'---------------------------------------------------------------------------------------

Dim Gameover, Winner, Paused As Boolean
Dim Score As Integer
Dim LastDirection As Integer
Dim PositionString As String
Dim Moved, Autopilot As Boolean

'---------------------------------------------------------------------------------------
' Procedure : AboutButton_Click
' DateTime  : 4/20/2022 11:11
' Author    : aoconnell
' Purpose   : Shows what the program is about when the game is over.
'---------------------------------------------------------------------------------------
'
Private Sub AboutButton_Click()
    MsgBox ("A simple program made to adjust to VB6. Made by Albert O'Connell")
End Sub

'---------------------------------------------------------------------------------------
' Procedure : ClosePause_Click
' DateTime  : 4/20/2022 11:13
' Author    : aoconnell
' Purpose   : Resumes the game from the pause menu. Also is responsible for closing the pause menu
'---------------------------------------------------------------------------------------
'
Private Sub ClosePause_Click()
    Paused = False
    PauseFrame.Visible = False
End Sub

'---------------------------------------------------------------------------------------
' Procedure : ControlsButton_Click
' DateTime  : 4/20/2022 15:58
' Author    : aoconnell
' Purpose   : Show the controls for the game
'---------------------------------------------------------------------------------------
'
Private Sub ControlsButton_Click()
    Dim ControlString As String
    ControlString = "Controls" + vbNewLine + "W A S D to move" + vbNewLine + "P for Debug data" + vbNewLine + "H to hide score/speed"
    Action = MsgBox(ControlString, vbOKOnly)
End Sub

'---------------------------------------------------------------------------------------
' Procedure : Form_Load
' DateTime  : 4/20/2022 15:59
' Author    : aoconnell
' Purpose   : When we load the game of snake we should reset the score, direction, and Pause/Gameover states
'---------------------------------------------------------------------------------------
'
Private Sub Form_Load()
    Gameover = False
    Paused = False
    Winner = False
    Moved = False
    Autopilot = False
    Score = 0
    LastDirection = 0
    Restart.Visible = False
    GameoverLabel.Visible = False
    ControlsButton.Visible = False
    AboutButton.Visible = False
    ScoreLabel.Caption = "Score: 0"
    SpeedLabel.Caption = "Speed: 1"
    Label1Control.Caption = "                  Controls" + vbNewLine + "W: Move Up" + vbNewLine + "S: Move Down" + vbNewLine + "A: Move Left" + vbNewLine + "D: Move Right" + vbNewLine + "P: Show Points" + vbNewLine + "H: Hide Score/Speed" + vbNewLine + "ESC: Pause Menu"
    End Sub



Private Sub Restart_Click()
    Form_Load
End Sub

'---------------------------------------------------------------------------------------
' Procedure : Timer1_Timer
' DateTime  : 4/20/2022 16:07
' Author    : aoconnell
' Purpose   : The timer is used to move the snake at an interval. Initially it starts at 500 ms and a its fastest it is 100ms
'---------------------------------------------------------------------------------------
'
Private Sub Timer1_Timer()
    PositionString = ""
    If Gameover = False And Winner = False And Paused = False Then
        Call MoveSnake(LastDirection, False)
        For i = 0 To Snake.Count - 1
            PositionString = PositionString + CStr(i) + ": " + CStr(Snake(i).Top) + " " + CStr(Snake(i).Left) + vbNewLine
        Next
        Coordinates.Caption = PositionString + "Rat: " + CStr(Rat(Score).Top) + " " + CStr(Rat(Score).Left)
    ElseIf Winner = True Then
        WinLabel.Caption = WinLabel.Caption + vbNewLine + "  Score: " + CStr(Score)
        WinLabel.Visible = True
        ControlsButton.Visible = True
        AboutButton.Visible = True
    ElseIf Paused = True Then
        PauseFrame.Visible = True
    Else
        'changes the mouse pointer to a different icon
        'Screen.MousePointer = 11
        GameoverLabel.Visible = True
        ControlsButton.Visible = True
        AboutButton.Visible = True
        Restart.Visible = True
    End If
End Sub

'---------------------------------------------------------------------------------------
' Procedure : DotCreation
' DateTime  : 4/20/2022 16:08
' Author    : aoconnell
' Purpose   : This creates the grey dot that the snake "eats" to increase in length
'---------------------------------------------------------------------------------------
'
Public Function DotCreation()
    Dim Count As Integer
    Dim MoveSpot As Boolean
    MoveSpot = False
    Count = Rat.Count
    Load Rat(Count)
    Randomize
    ' The max value for the height is 19 since the score label takes up the bottom row
    Rat(Count).Top = Int((Rnd * 19) + 2) * 200
    Rat(Count).Left = Int((Rnd * 20) + 2) * 200
    For i = 0 To Snake.Count - 1
        If Snake(i).Top = Rat(Count).Top And Snake(i).Left = Rat(Count).Left Then
            MoveSpot = True
        End If
    Next
    If MoveSpot = True Then
        Rat(Count).Top = Int((Rnd * 19) + 2) * 200
        Rat(Count).Left = Int((Rnd * 20) + 2) * 200
        MoveSpot = False
        For i = 0 To Snake.Count - 1
        If Snake(i).Top = Rat(Count).Top And Snake(i).Left = Rat(Count).Left Then
            MoveSpot = True
        End If
        Next
    End If
    Rat(Count).Visible = True
End Function

'---------------------------------------------------------------------------------------
' Procedure : Form_KeyPress
' DateTime  : 4/20/2022 16:09
' Author    : aoconnell
' Purpose   : This subroutine used the inputs from the keyboard to steer the snake and enable other functions
'---------------------------------------------------------------------------------------
'
Private Sub Form_KeyPress(KeyAscii As Integer)
    Dim result As Variant
    'This can be used to check what the value of each key pressed is in ascii
    'MsgBox (CStr(KeyAscii))
    If KeyAscii = 93 Then
        If Autopilot = False Then
            Autopilot = True
        Else
            Autopilot = False
        End If
    End If
    If KeyAscii = 104 Then
        If ScoreLabel.Visible = True Then
            ScoreLabel.Visible = False
            SpeedLabel.Visible = False
        Else
            ScoreLabel.Visible = True
            SpeedLabel.Visible = True
        End If
    End If
    If Moved = False Then
        'Go Up when w is pressed 3
        If KeyAscii = 119 Then
            'Call MoveSnake(3, True)
            'Snake(0).Top = Snake(0).Top - 200
            If LastDirection = 2 Then
            
            Else
                LastDirection = 3
                Moved = True
            End If
        End If
        'Go Down when s is pressed 2
        If KeyAscii = 115 Then
            'Call MoveSnake(2, True)
            'Snake(0).Top = Snake(0).Top + 200
            If LastDirection = 3 Then
            
            Else
                LastDirection = 2
                Moved = True
            End If
        End If
        'Go Left when a is pressed 1
        If KeyAscii = 97 Then
            'Call MoveSnake(1, True)
            'Snake(0).Left = Snake(0).Left - 200
            If LastDirection = 0 Then
            
            Else
                LastDirection = 1
                Moved = True
            End If
        End If
        'Go Right when d is pressed 0
        If KeyAscii = 100 Then
            'Call MoveSnake(0, True)
            'Snake(0).Left = Snake(0).Left + 200
            If LastDirection = 1 Then
            
            Else
                LastDirection = 0
                Moved = True
            End If
        End If
    End If
    'Hide and show the Coordinate box when p is pressed
    If KeyAscii = 112 Then
        If Coordinates.Visible = True Then
            Coordinates.Visible = False
        Else
            Coordinates.Visible = True
        End If
    End If
    'Add length to the snake
    If KeyAscii = 108 Then
        Dim Count As Integer
        Count = Snake.Count
        Load Snake(Count)
        Snake(Count).Visible = True
    End If
    'Press K to increase the speed
    If KeyAscii = 107 Then
        If Timer1.Interval > 10 Then
            Timer1.Interval = Timer1.Interval - 5
            SpeedLabel.Caption = "Speed: " + CStr(1 + (500 - Timer1.Interval) / 500)
        End If
    End If
    'Press J to decrease the speed
    If KeyAscii = 106 Then
        If Timer1.Interval > 10 Then
            Timer1.Interval = Timer1.Interval + 5
            SpeedLabel.Caption = "Speed: " + CStr(1 + (500 - Timer1.Interval) / 500)
        End If
    End If
    'pause the game when ESC is pressed
    If KeyAscii = 27 Then
        If Paused = False Then
            Paused = True
        Else
            Paused = False
            PauseFrame.Visible = False
            Call ClosePause_Click
        End If
    End If
End Sub

'---------------------------------------------------------------------------------------
' Procedure : MoveSnake
' DateTime  : 4/20/2022 16:10
' Author    : aoconnell
' Purpose   : This function handles how far and what direction the snake should move in. Additionally the logic for the tail is here
'---------------------------------------------------------------------------------------
' Originally I had a turn boolean for different logic on turns but found later it was not needed
Public Function MoveSnake(Direction As Integer, Turn As Boolean)
    'First we create an array to store the location of the parts of the snake
    Dim X(100), Y(100) As Integer
    'Use a for loop to store the values
    For i = 0 To Snake.Count - 1
        X(i) = Snake(i).Left
        Y(i) = Snake(i).Top
    Next
    'Next we must move the head of the snake to the last recorded direction from the user input
    If Autopilot = False Then
        If Direction = 0 Then
            Snake(0).Left = Snake(0).Left + 200
        ElseIf Direction = 1 Then
            Snake(0).Left = Snake(0).Left - 200
        ElseIf Direction = 2 Then
            Snake(0).Top = Snake(0).Top + 200
        Else
            Snake(0).Top = Snake(0).Top - 200
        End If
        'Now that the head has moved 1 of 4 directions we should make the tail follow
        'Notice that the loop starts at 1 since the head already moved. Then we can make the rest follow in a line via setting its destination to the parent
        'part
        For i = 1 To Snake.Count - 1
            Snake(i).Top = Y(i - 1)
            Snake(i).Left = X(i - 1)
        Next
    'AUTOPILOT
    ElseIf Autopilot = True Then
        Dim Top, Bottom, Left, Right, InSnake, AnyRight, AnyLeft, AnyTop, AnyBottom As Boolean
        Dim Above, Below, NLeft, NRight As Integer
        Top = False
        Bottom = False
        Left = False
        Right = False
        AnyTop = False
        AnyBottom = False
        AnyLeft = False
        AnyRight = False
        Above = 0
        Below = 0
        NLeft = 0
        NRight = 0
        For i = 1 To Snake.Count - 1
            If Snake(0).Left - 200 = Snake(i).Left And Snake(0).Top = Snake(i).Top Then
                Left = True
                If Snake(0).Top = Snake(A).Top And Snake(A).Left < Snake(0).Left Then
                    AnyLeft = True
                End If
            ElseIf Snake(0).Left + 200 = Snake(i).Left And Snake(0).Top = Snake(i).Top Then
                Right = True
                If Snake(0).Top = Snake(A).Top And Snake(A).Left > Snake(0).Left Then
                    AnyRight = True
                End If
            ElseIf Snake(0).Top - 200 = Snake(i).Top And Snake(0).Left = Snake(i).Left Then
                Top = True
                If Snake(0).Left = Snake(A).Left And Snake(A).Top < Snake(0).Top Then
                    AnyTop = True
                End If
            ElseIf Snake(0).Top + 200 = Snake(i).Top And Snake(0).Left = Snake(i).Left Then
                Bottom = True
                If Snake(0).Left = Snake(A).Left And Snake(A).Top > Snake(0).Top Then
                    AnyBottom = True
                End If
            End If
            If Rat(Score).Top = Snake(i).Top And Rat(Score).Left = Snake(i).Left Then
                InSnake = True
            End If
        Next
        'Trying to count the number of snake parts on all sides. Works but not helpful
        For A = 1 To Snake.Count - 1
            If Snake(A).Top > Snake(0).Top And Snake(0).Top > Snake(A).Top - 399 Then
                Below = Below + 1
            ElseIf Snake(A).Top < Snake(0).Top And Snake(0).Top < Snake(A).Top + 400 Then
                Above = Above + 1
            End If
            If Snake(A).Left > Snake(0).Left Then
                NRight = NRight + 1
            ElseIf Snake(A).Left < Snake(0).Left Then
                NLeft = NLeft + 1
            End If
        Next
        If True Then
            If Snake(0).Top > Rat(Score).Top Then
                If Top = False Then
                    Direction = 3
                ElseIf Bottom = False Then
                    Direction = 2
                ElseIf Left = False And AnyLeft = False Then
                    Direction = 1
                Else
                    Direction = 0
                End If
            Else
                If Bottom = False Then
                    Direction = 2
                ElseIf Top = False Then
                    Direction = 3
                ElseIf Right = False And AnyRight = False Then
                    Direction = 0
                Else
                    Direction = 1
                End If
            End If
            If Snake(0).Top = Rat(Score).Top Then
                If Snake(0).Left > Rat(Score).Left Then
                    If Left = False Then
                        Direction = 1
                    ElseIf Right = False Then
                        Direction = 0
                    ElseIf Bottom = False And AnyBottom = False Then
                        Direction = 2
                    Else
                        Direction = 3
                    End If
                Else
                    If Right = False Then
                        Direction = 0
                    ElseIf Left = False Then
                        Direction = 1
                    ElseIf Bottom = False And AnyBottom = False Then
                        Direction = 2
                    Else
                        Direction = 3
                    End If
                End If
            End If
            'Go Right
            If Direction = 0 Then
                Snake(0).Left = Snake(0).Left + 200
            'Go Left
            ElseIf Direction = 1 Then
                Snake(0).Left = Snake(0).Left - 200
            'Go Down
            ElseIf Direction = 2 Then
                Snake(0).Top = Snake(0).Top + 200
            'Go Up
            Else
                Snake(0).Top = Snake(0).Top - 200
            End If
        End If
    End If
    LastDirection = Direction
        'Now that the head has moved 1 of 4 directions we should make the tail follow
        'Notice that the loop starts at 1 since the head already moved. Then we can make the rest follow in a line via setting its destination to the parent
        'part
        For J = 1 To Snake.Count - 1
            Snake(J).Top = Y(J - 1)
            Snake(J).Left = X(J - 1)
        Next
    'Lastly we check that the head of the snake is not touching any part of the snake
    'First we need to set the array values to the new positions
    For K = 0 To Snake.Count - 1
        X(K) = Snake(K).Left
        Y(K) = Snake(K).Top
    Next
    'Now we cycle through all the positions and check if the head matches the X and Y. If they do then make gameover true
    For h = 1 To Snake.Count - 1
        If X(0) = X(h) And Y(0) = Y(h) Then
            Gameover = True
        End If
    Next
    'Finally we can check if the snake has gone out of bounds with the CheckOB function
    CheckOB
    Moved = False
End Function

'---------------------------------------------------------------------------------------
' Procedure : CheckOB
' DateTime  : 4/20/2022 16:19
' Author    : aoconnell
' Purpose   :This function is resposible for moving the snake back to the screen if it goes off the screen
'---------------------------------------------------------------------------------------
'
Public Function CheckOB()
    'For each of the snake parts we check to see if it is out of bounds. The bounds are specifically set based on when the snake is leaving the screen
    'Window size cannot be adjusted so we can just hard code this
    For i = 0 To Snake.Count - 1
        If Snake(i).Top > 4000 Then
            Snake(i).Top = 0
        ElseIf Snake(i).Top < 0 Then
            Snake(i).Top = 4000
        End If
        If Snake(i).Left > 4600 Then
            Snake(i).Left = 0
        ElseIf Snake(i).Left < 0 Then
            Snake(i).Left = 4600
        End If
    Next
    'Check to see if the snake head is on a rat and if so then increase length and score. Also make a new rat
    If Snake(0).Top = Rat(Score).Top And Snake(0).Left = Rat(Score).Left Then
        Dim Count As Integer
        'Make a funny beep noise when the rate is ate
        Beep
        'New snake part creation
        Count = Snake.Count
        Load Snake(Count)
        Snake(Count).Visible = True
        'Turn the rat that was eaten invisible
        Rat(Score).Visible = False
        DotCreation
        'If the timer is not at the max of 100 ms then increase the speed based on the score the player has
        If Timer1.Interval > 100 Then
            If Score < 10 Then
                Timer1.Interval = Timer1.Interval - 5
            ElseIf Score < 20 Then
                Timer1.Interval = Timer1.Interval - 7
            ElseIf Score < 30 Then
                Timer1.Interval = Timer1.Interval - 10
            ElseIf Score < 40 Then
                Timer1.Interval = Timer1.Interval - 12
            ElseIf Score < 50 Then
                Timer1.Interval = Timer1.Interval - 15
            End If
        End If
        'Add score since a rat was eaten
        Score = Score + 1
        'once the player gets to 50 end the game. Max score can go up to 100 then the array for position data will run out
        If Score = 50 Then
            Winner = True
        End If
        'Update the score and speed labels
        ScoreLabel.Caption = "Score: " + CStr(Score)
        SpeedLabel.Caption = "Speed: " + CStr(1 + (500 - Timer1.Interval) / 500)
    End If
End Function
