$pdf_mode = 1;
$out_dir = '../../build';
$aux_dir = '../../build/aux';

add_cus_dep('glo', 'gls', 0, 'makeglosaries');
add_cus_dep('acn', 'acr', 0, 'makeglosaries');

sub makeglosaries {
    my $name = $_[0];
    system("makeglossaries", $name);
}
