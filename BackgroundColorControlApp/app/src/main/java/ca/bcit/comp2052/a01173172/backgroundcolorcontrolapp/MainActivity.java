package ca.bcit.comp2052.a01173172.backgroundcolorcontrolapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import android.os.Bundle;
import android.widget.SeekBar;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    SeekBar redSeekBar, greenSeekBar, blueSeekBar;
    TextView redValue, greenValue, blueValue;
    ConstraintLayout myScreen;
    int redSeekBarValue, greenSeekBarValue, blueSeekBarValue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        redSeekBar = (SeekBar) findViewById(R.id.red_seekBar);
        greenSeekBar = (SeekBar) findViewById(R.id.green_seekBar);
        blueSeekBar = (SeekBar) findViewById(R.id.blue_seekBar);

        redSeekBar.setMax(255);
        greenSeekBar.setMax(255);
        blueSeekBar.setMax(255);

        redValue = (TextView) findViewById(R.id.red_textView);
        greenValue = (TextView) findViewById(R.id.green_textView);
        blueValue = (TextView) findViewById(R.id.blue_textView);

        myScreen = (ConstraintLayout) findViewById(R.id.my_screen);

        redSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                redValue.setText("Red: " + String.valueOf(progress));
                updateBackground();
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

        greenSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                greenValue.setText("Green: " + String.valueOf(progress));
                updateBackground();
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

        blueSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                blueValue.setText("Blue: " + String.valueOf(progress));
                updateBackground();
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

    }
    private void updateBackground() {
        redSeekBarValue = redSeekBar.getProgress();
        greenSeekBarValue = greenSeekBar.getProgress();
        blueSeekBarValue = blueSeekBar.getProgress();
        myScreen.setBackgroundColor(0xff000000 + redSeekBarValue * 0x10000 + greenSeekBarValue * 0x100
                + blueSeekBarValue);
    }
}