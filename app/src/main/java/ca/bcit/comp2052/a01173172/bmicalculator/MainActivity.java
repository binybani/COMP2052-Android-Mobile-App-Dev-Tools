package ca.bcit.comp2052.a01173172.bmicalculator;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private int count = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button calculateButton = (Button)findViewById(R.id.calculate_button);
        EditText heightText = (EditText) findViewById(R.id.height_edit_number_decimal);
        EditText weightText = (EditText)findViewById(R.id.weight_edit_number_decimal);
        TextView resultTextView = (TextView)findViewById(R.id.result_text_view);
        TextView underweightTextView = (TextView)findViewById(R.id.underweight_textView);
        TextView normalWeightTextView = (TextView)findViewById(R.id.normalWeight_textView);
        TextView overweightTextView = (TextView)findViewById(R.id.overweight_textView);
        TextView obeseTextView = (TextView)findViewById(R.id.obese_textView);

        calculateButton.setOnClickListener(new android.view.View.OnClickListener() {
            @Override
            public void onClick(View view) {
                count++;

                String inputHeight = heightText.getText().toString();
                String inputWeight = weightText.getText().toString();

                float heightInputFloat = 0.0f;
                float weightInputFloat = 0.0f;

                try {
                    heightInputFloat = Float.parseFloat(inputHeight);
                    weightInputFloat = Float.parseFloat(inputWeight);
                } catch (Exception e) {
                    resultTextView.setText(e.getMessage());
                    return;
                }

                heightInputFloat = heightInputFloat / 100;
                float BMIresult = weightInputFloat / (heightInputFloat * heightInputFloat);

                if (count % 2 != 0) {
                    resultTextView.setText("Your BMI Value: " + String.format("%.2f", BMIresult));
                    if (BMIresult < 18.5) {
                        underweightTextView.setBackgroundColor(Color.parseColor("#FCBA04"));
                        underweightTextView.setTextColor(Color.BLACK);
                    } else if (BMIresult < 25.0) {
                        normalWeightTextView.setBackgroundColor(Color.parseColor("#78BC61"));
                        normalWeightTextView.setTextColor(Color.WHITE);
                    } else if (BMIresult < 30.0) {
                        overweightTextView.setBackgroundColor(Color.parseColor("#A50104"));
                        overweightTextView.setTextColor(Color.WHITE);
                    } else {
                        obeseTextView.setBackgroundColor(Color.BLACK);
                        obeseTextView.setTextColor(Color.WHITE);
                    }
                    calculateButton.setText(getString(R.string.reset_button_text));
                } else {
                    Intent intent = getIntent();
                    finish();
                    startActivity(intent);
                    calculateButton.setText(getString(R.string.calculate_button_text));
                }
            }
        });
    }
}