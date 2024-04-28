import java.awt.event.*;
import javax.swing.*;
import java.awt.*;

class Calculator extends JFrame implements ActionListener {
  static JFrame f;
  static JTextField l;
  String s0, s1, s2;

  Calculator() {
    s0 = s1 = s2 = "";
  }

  public static void main(String args[]) {
    f = new JFrame("Calculator");
    try {
      UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
    } catch (Exception e) {
      System.err.println(e.getMessage());
    }
    Calculator c = new Calculator();
    l = new JTextField(16);
    l.setEditable(false);

    JButton b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, ba, bs, bd, bm, be, beq, beq1;
    b0 = new JButton("0");
    b1 = new JButton("1");
    b2 = new JButton("2");
    // ... (other buttons)

    // Add action listeners to buttons
    b0.addActionListener(c);
    b1.addActionListener(c);
    // ... (other buttons)

    JPanel p = new JPanel();
    p.add(l);
    p.add(ba);
    p.add(b1);
    // ... (other buttons)

    p.setBackground(Color.blue);
    f.add(p);
    f.setSize(200, 220);
    f.setVisible(true);
  }

  public void actionPerformed(ActionEvent e) {
    String s = e.getActionCommand();
    if ((s.charAt(0) >= '0' && s.charAt(0) <= '9') || s.charAt(0) == '.') {
      if (!s1.equals("")) {
        s2 = s2 + s;
      } else {
        s0 = s0 + s;
      }
      l.setText(s0 + s1 + s2);
    } else if (s.charAt(0) == 'C') {
      s0 = s1 = s2 = "";
      l.setText(s0 + s1 + s2);
    } else if (s.charAt(0) == '=') {
      // Perform calculation
      // ...
    }
  }
}
